import { Role } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { sendNotification } from '@things-factory/shell'
import { getManager } from 'typeorm'
import { ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderVas, VasOrder } from '../../../entities'

export const rejectVasOrder = {
  async rejectVasOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async (trxMgr) => {
      try {
        if (!patch.remark) throw new Error('Remark is not exist.')

        const vasOrder: VasOrder = await trxMgr.getRepository(VasOrder).findOne({
          where: { domain: context.state.domain, name, status: ORDER_STATUS.PENDING_RECEIVE },
          relations: ['bizplace', 'orderVass'],
        })
        if (!vasOrder) throw new Error(`Vas order doesn't exists.`)
        let customerBizplace: Bizplace = vasOrder.bizplace

        // 1. Update status of order vass (PENDING_RECEIVE => REJECTED)
        const orderVass: OrderVas[] = vasOrder.orderVass.map((orderVas: OrderVas) => {
          return {
            ...orderVas,
            status: ORDER_VAS_STATUS.REJECTED,
            updater: context.state.user,
          }
        })
        await trxMgr.getRepository(OrderVas).save(orderVass)

        await trxMgr.getRepository(VasOrder).save({
          ...vasOrder,
          ...patch,
          status: ORDER_STATUS.REJECTED,
          updater: context.state.user,
        })

        // notification logics
        // get Office Admin Users
        const users: any[] = await trxMgr
          .getRepository('users_roles')
          .createQueryBuilder('ur')
          .select('ur.users_id', 'id')
          .where((qb) => {
            const subQuery = qb
              .subQuery()
              .select('role.id')
              .from(Role, 'role')
              .where("role.name = 'Office Admin'")
              .andWhere('role.domain_id = :domain', { domain: context.state.domain.id })
              .getQuery()
            return 'ur.roles_id IN ' + subQuery
          })
          .getRawMany()

        // send notification to Customer Users
        if (users?.length) {
          const msg = {
            title: `Latest status for ${vasOrder.name}`,
            message: `Your VAS order has been rejected.`,
            url: context.header.referer,
          }
          users.forEach((user) => {
            sendNotification({
              receiver: user.id,
              message: JSON.stringify(msg),
            })
          })
        }

        return vasOrder
      } catch (e) {
        throw e
      }
    })
  },
}
