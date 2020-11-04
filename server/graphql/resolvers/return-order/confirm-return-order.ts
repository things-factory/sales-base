import { Role, User } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { Domain, sendNotification } from '@things-factory/shell'
import { EntityManager, getManager } from 'typeorm'
import { ORDER_INVENTORY_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderInventory, OrderVas, ReturnOrder } from '../../../entities'

export const confirmReturnOrderResolver = {
  async confirmReturnOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const returnOrder: ReturnOrder = await confirmReturnOrder(trxMgr, name, context)

      return returnOrder
    })
  }
}

export async function confirmReturnOrder(trxMgr: EntityManager, name: string, context: any): Promise<ReturnOrder> {
  const domain: Domain = context.state.domain
  const user: User = context.state.user

  const foundReturnOrder: ReturnOrder = await trxMgr.getRepository(ReturnOrder).findOne({
    where: { domain, name, status: ORDER_STATUS.PENDING },
    relations: ['bizplace', 'orderInventories', 'orderVass']
  })

  if (!foundReturnOrder) throw new Error(`Return order doesn't exists.`)
  let foundOIs: OrderInventory[] = foundReturnOrder.orderInventories
  let foundOVs: OrderVas[] = foundReturnOrder.orderVass
  let customerBizplace: Bizplace = foundReturnOrder.bizplace

  // 1. RO Status change (PENDING => PENDING_RECEIVE)
  const returnOrder: ReturnOrder = await trxMgr.getRepository(ReturnOrder).save({
    ...foundReturnOrder,
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
      title: `New Return Order from ${customerBizplace.name}`,
      message: `New incoming order, ${foundReturnOrder.name} is pending for receiving`,
      url: context.header.referer
    }
    users.forEach(user => {
      sendNotification({
        receiver: user.id,
        message: JSON.stringify(msg)
      })
    })
  }

  return returnOrder
}
