import { Role } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { sendNotification } from '@things-factory/shell'
import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { VasOrder } from '../../../entities'

export const confirmVasOrder = {
  async confirmVasOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const foundVasOrder: VasOrder = await trxMgr.getRepository(VasOrder).findOne({
        where: { domain: context.state.domain, name },
        relations: ['bizplace', 'orderVass', 'orderVass.vas', 'creator', 'updater']
      })

      let vasOrder: VasOrder
      let customerBizplace: Bizplace = foundVasOrder.bizplace
      if (!foundVasOrder) throw new Error(`Vas order doesn't exists.`)
      if (foundVasOrder.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // 1. Vas Order Status change (PENDING => PENDING_RECEIVE)
      vasOrder = await trxMgr.getRepository(VasOrder).save({
        ...foundVasOrder,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

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
            .andWhere('role.domain_id = :domain', { domain: context.state.domain.id })
            .getQuery()
          return 'ur.roles_id IN ' + subQuery
        })
        .getRawMany()

      // send notification to Office Admin Users
      if (users?.length) {
        const msg = {
          title: `New VAS Order from ${customerBizplace.name}`,
          message: `New incoming order, ${foundVasOrder.name} is pending for receiving`,
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
    })
  }
}
