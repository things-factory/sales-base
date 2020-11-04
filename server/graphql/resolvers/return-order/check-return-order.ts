import { Role, User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain, sendNotification } from '@things-factory/shell'
import { EntityManager, getManager } from 'typeorm'
import { ORDER_INVENTORY_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderInventory, OrderVas, ReturnOrder } from '../../../entities'

export const checkReturnOrderResolver = {
  async checkReturnOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const returnOrder: ReturnOrder = await checkReturnOrder(trxMgr, name, context)

      return returnOrder
    })
  }
}

export async function checkReturnOrder(trxMgr: EntityManager, name: string, context: any): Promise<ReturnOrder> {
  const domain: Domain = context.state.domain
  const user: User = context.state.user

  const foundReturnOrder: ReturnOrder = await trxMgr.getRepository(ReturnOrder).findOne({
    where: { domain, name, status: ORDER_STATUS.INTRANSIT },
    relations: ['bizplace', 'orderInventories', 'orderVass']
  })

  if (!foundReturnOrder) throw new Error(`Return order doesn't exists.`)

  let foundOIs: OrderInventory[] = foundReturnOrder.orderInventories
  let foundOVs: OrderVas[] = foundReturnOrder.orderVass
  let customerBizplace: Bizplace = foundReturnOrder.bizplace

  foundReturnOrder.status = ORDER_STATUS.ARRIVED
  foundReturnOrder.updater = user
  await trxMgr.getRepository(ReturnOrder).save(foundReturnOrder)

  // 1. Update status of order inventories
  foundOIs = foundOIs.map((orderInventory: OrderInventory) => {
    return {
      ...orderInventory,
      status: ORDER_INVENTORY_STATUS.ARRIVED,
      updater: user
    }
  })
  await trxMgr.getRepository(OrderInventory).save(foundOIs)

  // 2. Update status of order vass
  if (foundOVs && foundOVs.length) {
    foundOVs = foundOVs.map((orderVas: OrderVas) => {
      return {
        ...orderVas,
        status: ORDER_VAS_STATUS.ARRIVED,
        updater: user
      }
    })
    await trxMgr.getRepository(OrderVas).save(foundOVs)
  }

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

  // send notification to Office Admin Users
  if (users?.length) {
    const msg = {
      title: `Latest status for ${foundReturnOrder.name}`,
      message: `Your goods has safely arrived at ${context.state.domain}.`,
      url: context.header.referer
    }
    users.forEach(user => {
      sendNotification({
        receiver: user.id,
        message: JSON.stringify(msg)
      })
    })
  }

  return foundReturnOrder
}
