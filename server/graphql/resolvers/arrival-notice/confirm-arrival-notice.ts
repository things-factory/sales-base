import { Role } from '@things-factory/auth-base'
import { Bizplace } from '@things-factory/biz-base'
import { sendNotification } from '@things-factory/shell'
import { getManager } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, OrderProduct, OrderVas } from '../../../entities'

export const confirmArrivalNotice = {
  async confirmArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
        where: { domain: context.state.domain, name, status: ORDER_STATUS.PENDING },
        relations: [
          'bizplace',
          'orderProducts',
          'orderProducts.product',
          'orderVass',
          'orderVass.vas',
          'creator',
          'updater'
        ]
      })

      let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
      let foundOVs: OrderVas[] = foundArrivalNotice.orderVass
      let customerBizplace: Bizplace = foundArrivalNotice.bizplace

      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

      // 1. GAN Status change (PENDING => PENDING_RECEIVE)
      const arrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).save({
        ...foundArrivalNotice,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      foundOPs = foundOPs.map((op: OrderProduct) => {
        return { ...op, status: ORDER_PRODUCT_STATUS.PENDING_RECEIVE }
      })
      await trxMgr.getRepository(OrderProduct).save(foundOPs)

      // 2. Update order vas status if it exists.
      if (foundOVs && foundOVs.length) {
        foundOVs = foundOVs.map((ov: OrderVas) => {
          return { ...ov, status: ORDER_VAS_STATUS.PENDING_RECEIVE }
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
            .getQuery()
          return 'ur.roles_id = ' + subQuery
        })
        .getRawMany()

      // send notification to Office Admin Users
      if (users?.length) {
        const msg = {
          title: `New Arrival Notice from ${customerBizplace.name}`,
          message: `New incoming order, ${foundArrivalNotice.name} is pending for receiving`,
          url: context.header.referer
        }
        users.forEach(user => {
          sendNotification({
            receiver: user.id,
            message: JSON.stringify(msg)
          })
        })
      }

      return arrivalNotice
    })
  }
}
