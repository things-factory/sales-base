import { Bizplace } from '@things-factory/biz-base'
import { sendNotification } from '@things-factory/shell'
import { getManager } from 'typeorm'
import { ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderVas, VasOrder } from '../../../entities'

export const rejectVasOrder = {
  async rejectVasOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        if (!patch.remark) throw new Error('Remark is not exist.')

        const vasOrder: VasOrder = await trxMgr.getRepository(VasOrder).findOne({
          where: { domain: context.state.domain, name, status: ORDER_STATUS.PENDING_RECEIVE },
          relations: ['bizplace', 'orderVass']
        })
        if (!vasOrder) throw new Error(`Vas order doesn't exists.`)
        let customerBizplace: Bizplace = vasOrder.bizplace

        // 1. Update status of order vass (PENDING_RECEIVE => REJECTED)
        const orderVass: OrderVas[] = vasOrder.orderVass.map((orderVas: OrderVas) => {
          return {
            ...orderVas,
            status: ORDER_VAS_STATUS.REJECTED,
            updater: context.state.user
          }
        })
        await trxMgr.getRepository(OrderVas).save(orderVass)

        await trxMgr.getRepository(VasOrder).save({
          ...vasOrder,
          ...patch,
          status: ORDER_STATUS.REJECTED,
          updater: context.state.user
        })

        // notification logics
        // get Customer by bizplace
        const users: any[] = await trxMgr
          .getRepository('bizplaces_users')
          .createQueryBuilder('bu')
          .select('bu.users_id', 'id')
          .where(qb => {
            const subQuery = qb
              .subQuery()
              .select('bizplace.id')
              .from(Bizplace, 'bizplace')
              .where('bizplace.name = ' + customerBizplace.name)
              .getQuery()
            return 'bu.bizplaces_id = ' + subQuery
          })
          .getRawMany()

        // send notification to Customer Users
        if (users?.length) {
          const msg = {
            title: `Latest status for ${vasOrder.name}`,
            message: `Your VAS order has been rejected.`,
            url: context.header.referer
          }
          users.forEach(user => {
            sendNotification({
              receiver: user.id,
              message: JSON.stringify(msg)
            })
          })
        }

        return vasOrder
      } catch (e) {
        throw e
      }
    })
  }
}
