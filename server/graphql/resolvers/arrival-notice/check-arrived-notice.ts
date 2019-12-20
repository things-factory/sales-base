import { getManager } from 'typeorm'
import { Bizplace } from '@things-factory/biz-base'
import { sendNotification } from '@things-factory/shell'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas } from '../../../entities'

export const checkArrivedNotice = {
  async checkArrivedNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name, status: ORDER_STATUS.INTRANSIT },
          relations: ['bizplace', 'collectionOrders', 'orderProducts', 'orderVass']
        })

        if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

        // 1. Check wheter related collection order is done or not
        const foundCOs: CollectionOrder[] = foundArrivalNotice.collectionOrders
        if (foundCOs && foundCOs.length) {
          foundCOs.map((co: CollectionOrder) => {
            if (co.status !== ORDER_STATUS.DONE) {
              throw new Error(`Collection Order: ${co.name} is not finished yet.`)
            }
          })
        }

        let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
        let foundOVs: OrderVas[] = foundArrivalNotice.orderVass
        let customerBizplace: Bizplace = foundArrivalNotice.bizplace

        // 2. Update status of order products (INTRANSIT => ARRIVED)
        foundOPs = foundOPs.map((op: OrderProduct) => {
          return {
            ...op,
            status: ORDER_PRODUCT_STATUS.ARRIVED,
            updater: context.state.user
          }
        })
        await trxMgr.getRepository(OrderProduct).save(foundOPs)

        // 3. Update status of order vass if it exists (INTRANSIT => ARRIVED)
        if (foundOVs && foundOVs.length) {
          foundOVs = foundOVs.map((ov: OrderVas) => {
            return {
              ...ov,
              status: ORDER_VAS_STATUS.ARRIVED,
              updater: context.state.user
            }
          })
          await trxMgr.getRepository(OrderVas).save(foundOVs)
        }

        // 4. Update status of arrival notice (INTRANSIT => ARRIVED)
        await trxMgr.getRepository(ArrivalNotice).save({
          ...foundArrivalNotice,
          status: ORDER_STATUS.ARRIVED,
          updater: context.state.user
        })

        // notification logics
        // get Customer Users
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
            return 'bu.bizplaces_id IN ' + subQuery
          })
          .getRawMany()

        // send notification to Customer Users
        if (users?.length) {
          const msg = {
            title: `Latest status for ${foundArrivalNotice.name}`,
            message: `Your goods has safely arrived at ${context.state.domain}`,
            url: context.header.referer
          }
          users.forEach(user => {
            sendNotification({
              receiver: user.id,
              message: JSON.stringify(msg)
            })
          })
        }

        return foundArrivalNotice
      } catch (e) {
        throw e
      }
    })
  }
}
