import { User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain, sendNotification } from '@things-factory/shell'
import { Inventory } from '@things-factory/warehouse-base'
import { EntityManager, getManager } from 'typeorm'
import { ORDER_INVENTORY_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderInventory, OrderVas, ReleaseGood, ShippingOrder } from '../../../entities'

export const rejectReleaseGoodResolver = {
  async rejectReleaseGood(_: any, { name, patch: { remark } }, context: any) {
    return await getManager().transaction(async trxMgr => {
      return await rejectReleaseGood(trxMgr, context, name, remark)
    })
  }
}
export async function rejectReleaseGood(
  trxMgr: EntityManager,
  context: any,
  name: string,
  remark: string
): Promise<ReleaseGood> {
  const domain: Domain = context.state.domain
  const user: User = context.state.user

  const releaseGood: ReleaseGood = await trxMgr.getRepository(ReleaseGood).findOne({
    where: { domain, name, status: ORDER_STATUS.PENDING_RECEIVE },
    relations: ['bizplace', 'orderInventories', 'orderInventories.inventory', 'orderVass', 'shippingOrder']
  })

  if (!releaseGood) throw new Error(`Release good doesn't exists.`)
  if (!remark) throw new Error('Remark is not exist.')

  let foundOIs: OrderInventory[] = releaseGood.orderInventories
  let foundOVs: OrderVas[] = releaseGood.orderVass
  let customerBizplace: Bizplace = releaseGood.bizplace

  // 1. Update status of order products (PENDING_RECEIVE => REJECTED)
  if (foundOIs && foundOIs.length) {
    await trxMgr.getRepository(OrderInventory).save(
      await Promise.all(
        foundOIs.map(async (oi: OrderInventory) => {
          if (oi?.inventory?.id) {
            oi.inventory = await trxMgr.getRepository(Inventory).findOne(oi.inventory.id)

            await trxMgr.getRepository(Inventory).save({
              ...oi.inventory,
              lockedQty: oi.inventory.qty - oi.releaseQty,
              lockedWeight: oi.inventory.weight - oi.releaseWeight,
              updater: user
            })
          }

          oi.status = ORDER_INVENTORY_STATUS.REJECTED
          oi.updater = user
          return oi
        })
      )
    )
  }

  // 2. Update status of order vass if it exists (PENDING_RECEIVE => REJECTED)
  if (foundOVs && foundOVs.length) {
    foundOVs = foundOVs.map((ov: OrderVas) => {
      ov.status = ORDER_VAS_STATUS.REJECTED
      ov.updater = user
      return ov
    })
    await trxMgr.getRepository(OrderVas).save(foundOVs)
  }

  if (releaseGood.shippingOrder) {
    // 2. 1) if it's yes update status of collection order
    const shippingOrder: ShippingOrder = await trxMgr.getRepository(ShippingOrder).findOne({
      where: { domain, name: releaseGood.shippingOrder.name }
    })

    shippingOrder.status = ORDER_STATUS.REJECTED
    shippingOrder.updater = user
    await trxMgr.getRepository(ShippingOrder).save(shippingOrder)
  }

  releaseGood.remark = remark
  releaseGood.status = ORDER_STATUS.REJECTED
  releaseGood.updater = user
  await trxMgr.getRepository(ReleaseGood).save(releaseGood)

  // notification logics
  // get Customer by bizplace
  const users: any[] = await trxMgr
    .getRepository('bizplaces_users')
    .createQueryBuilder('bu')
    .select('bu.user_id', 'id')
    .where(qb => {
      const subQuery = qb
        .subQuery()
        .select('bizplace.id')
        .from(Bizplace, 'bizplace')
        .where('bizplace.name = :bizplaceName', { bizplaceName: customerBizplace.name })
        .getQuery()
      return 'bu.bizplace_id IN ' + subQuery
    })
    .getRawMany()

  // send notification to Customer Users
  if (users?.length) {
    const msg = {
      title: `Latest status for ${releaseGood.name}`,
      message: `Your RO has been rejected.`,
      url: context.header.referer
    }
    users.forEach(user => {
      sendNotification({
        receiver: user.id,
        message: JSON.stringify(msg)
      })
    })
  }

  return releaseGood
}
