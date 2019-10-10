import { getManager } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas } from '../../../entities'

export const receiveArrivalNotice = {
  async receiveArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const foundArrivalNotice: ArrivalNotice = await trxMgr.getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name, status: ORDER_STATUS.PENDING_RECEIVE },
          relations: ['collectionOrders', 'orderProducts', 'orderVass']
        })

        if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

        let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
        let foundOVs: OrderVas[] = foundArrivalNotice.orderVass
        let foundCOs: CollectionOrder[] = await trxMgr.getRepository(CollectionOrder).find({
          where: { domain: context.state.domain, refNo: foundArrivalNotice.name }
        })

        // 1. Update status of order products (PENDING_RECEIVE => INTRANSIT)
        foundOPs = foundOPs.map((op: OrderProduct) => {
          return {
            ...op,
            status: ORDER_PRODUCT_STATUS.INTRANSIT,
            updater: context.state.user
          }
        })
        await trxMgr.getRepository(OrderProduct).save(foundOPs)

        // 2. Update status of order vass if it exists (PENDING_RECEIVE => INTRANSIT)
        if (foundOVs && foundOVs.length) {
          foundOVs = foundOVs.map((ov: OrderVas) => {
            return {
              ...ov,
              status: ORDER_VAS_STATUS.INTRANSIT,
              updater: context.state.user
            }
          })
          await trxMgr.getRepository(OrderVas).save(foundOVs)
        }

        // 3. If there's collection order, update status of collection order (PENDING_RECEIVE => READY_TO_DISPATCH)
        if (foundCOs) {
          foundCOs = foundCOs.map((co: CollectionOrder) => {
            return {
              ...co,
              status: ORDER_STATUS.READY_TO_DISPATCH,
              updater: context.state.user
            }
          })
        }

        // 4. Update status of arrival notice (PENDING_RECEIVE => INTRANSIT)
        await trxMgr.getRepository(ArrivalNotice).save({
          ...foundArrivalNotice,
          status: ORDER_STATUS.INTRANSIT,
          updater: context.state.user
        })

        return foundArrivalNotice
      } catch (e) {
        throw e
      }
    })
  }
}
