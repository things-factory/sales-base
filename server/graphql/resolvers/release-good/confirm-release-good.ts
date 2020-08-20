import { Role, User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain, sendNotification } from '@things-factory/shell'
import { EntityManager, getManager } from 'typeorm'
import { ORDER_INVENTORY_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderInventory, OrderVas, ReleaseGood } from '../../../entities'
import { confirmArrivalNotice } from '../arrival-notice/confirm-arrival-notice'

export const confirmReleaseGoodResolver = {
  async confirmReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const releaseGood: ReleaseGood = await confirmReleaseGood(trxMgr, name, context)

      // If current RO has cross docking
      if (releaseGood.crossDocking) {
        const { arrivalNotice } = await trxMgr.getRepository(ReleaseGood).findOne(releaseGood.id, {
          relations: ['arrivalNotice']
        })

        // If status of related GAN is not equal to PENDING_RECEIVE (i.e. Wasn't confirmed yet.)
        if (arrivalNotice.status !== ORDER_STATUS.PENDING_RECEIVE) {
          await confirmArrivalNotice(trxMgr, arrivalNotice.name, context)
        }
      }

      return releaseGood
    })
  }
}

export async function confirmReleaseGood(trxMgr: EntityManager, name: string, context: any): Promise<ReleaseGood> {
  const domain: Domain = context.state.domain
  const user: User = context.state.user

  const foundReleaseGood: ReleaseGood = await trxMgr.getRepository(ReleaseGood).findOne({
    where: { domain, name, status: ORDER_STATUS.PENDING },
    relations: ['bizplace', 'orderInventories', 'orderVass']
  })

  if (!foundReleaseGood) throw new Error(`Release good order doesn't exists.`)
  let foundOIs: OrderInventory[] = foundReleaseGood.orderInventories
  let foundOVs: OrderVas[] = foundReleaseGood.orderVass
  let customerBizplace: Bizplace = foundReleaseGood.bizplace

  // 1. RO Status change (PENDING => PENDING_RECEIVE)
  const releaseGood: ReleaseGood = await trxMgr.getRepository(ReleaseGood).save({
    ...foundReleaseGood,
    status: ORDER_STATUS.PENDING_RECEIVE,
    updater: user
  })

  // 1. Update status of order inventories
  foundOIs = foundOIs.map((orderInventory: OrderInventory) => {
    return {
      ...orderInventory,
      status: ORDER_INVENTORY_STATUS.PENDING_RECEIVE,
      updater: user
    }
  })
  await trxMgr.getRepository(OrderInventory).save(foundOIs)

  // 2. Update status of order vass
  if (foundOVs && foundOVs.length) {
    foundOVs = foundOVs.map((orderVas: OrderVas) => {
      return {
        ...orderVas,
        status: ORDER_VAS_STATUS.PENDING_RECEIVE,
        updater: user
      }
    })
    await trxMgr.getRepository(OrderVas).save(foundOVs)
  }

  // notification logics
  // get Office Admin Users
  const users: any[] = await trxMgr
    .getRepository('users_roles')
    .createQueryBuilder('ur')
    .select('ur.users_id', 'id')
    .where(qb => {
      const subQuery = qb
        .subQuery()
        .select('role.id')
        .from(Role, 'role')
        .where("role.name = 'Office Admin'")
        .andWhere('role.domain_id = :domain', { domain: domain.id })
        .getQuery()
      return 'ur.roles_id IN ' + subQuery
    })
    .getRawMany()

  // send notification to Office Admin Users
  if (users?.length) {
    const msg = {
      title: `New Release Order from ${customerBizplace.name}`,
      message: `New incoming order, ${foundReleaseGood.name} is pending for receiving`,
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
