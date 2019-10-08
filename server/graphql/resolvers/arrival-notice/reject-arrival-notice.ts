import { getManager, getRepository } from 'typeorm'
import { ArrivalNotice, OrderProduct, CollectionOrder, OrderVas } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'

export const rejectArrivalNotice = {
  async rejectArrivalNotice(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name, status: ORDER_STATUS.PENDING_RECEIVE },
          relations: ['orderProducts', 'orderVass', 'collectionOrders']
        })

        if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
        if (!patch.remark) throw new Error('Remark is not exist.')

        let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
        let foundOVs: OrderVas[] = foundArrivalNotice.orderVass
        let foundCOs: CollectionOrder[] = foundArrivalNotice.collectionOrders

        // 1. Update status of order products (PENDING_RECEIVE => REJECTED)
        foundOPs = foundOPs.map((op: OrderProduct) => {
          return {
            ...op,
            status: ORDER_PRODUCT_STATUS.REJECTED,
            updater: context.state.user
          }
        })
        await getRepository(OrderProduct).save(foundOPs)

        // 2. Update status of order vass if it exists (PENDING_RECEIVE => REJECTED)
        if (foundOVs && foundOVs.length) {
          foundOVs = foundOVs.map((ov: OrderVas) => {
            return {
              ...ov,
              status: ORDER_VAS_STATUS.REJECTED,
              updater: context.state.user
            }
          })
          await getRepository(OrderVas).save(foundOVs)
        }

        // 3. If there's collection order, update status of collection order (PENDING_RECEIVE => REJECTED)
        if (foundCOs)
          foundCOs = foundCOs.map((co: CollectionOrder) => {
            return {
              ...co,
              status: ORDER_STATUS.REJECTED,
              updater: context.state.user
            }
          })

        return foundArrivalNotice
      } catch (e) {
        throw e
      }
    })
  }
}
