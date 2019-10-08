import { getManager, getRepository } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { CollectionOrder, ArrivalNotice, OrderProduct, OrderVas } from '../../../entities'

export const checkArrivedNotice = {
  async checkArrivedNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name, status: ORDER_STATUS.INTRANSIT },
          relations: ['collectionOrders', 'orderProducts', 'orderVass']
        })

        if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)

        // 1. Check wheter related collection order is done or not
        const foundCOs: CollectionOrder[] = await getRepository(CollectionOrder).find({
          where: { domain: context.state.domain, refNo: foundArrivalNotice.name }
        })
        if (foundCOs && foundCOs.length) {
          foundCOs.map((co: CollectionOrder) => {
            if (co.status !== ORDER_STATUS.DONE) {
              throw new Error(`Collection Order: ${co.name} is not finished yet.`)
            }
          })
        }

        let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
        let foundOVs: OrderVas[] = foundArrivalNotice.orderVass

        // 2. Update status of order products (INTRANSIT => ARRIVED)
        foundOPs = foundOPs.map((op: OrderProduct) => {
          return {
            ...op,
            status: ORDER_PRODUCT_STATUS.ARRIVED,
            updater: context.state.user
          }
        })
        await getRepository(OrderProduct).save(foundOPs)

        // 3. Update status of order vass if it exists (INTRANSIT => ARRIVED)
        if (foundOVs && foundOVs.length) {
          foundOVs = foundOVs.map((ov: OrderVas) => {
            return {
              ...ov,
              status: ORDER_VAS_STATUS.ARRIVED,
              updater: context.state.user
            }
          })
          await getRepository(OrderVas).save(foundOVs)
        }

        // 4. Update status of arrival notice (INTRANSIT => ARRIVED)
        await getRepository(ArrivalNotice).save({
          ...foundArrivalNotice,
          status: ORDER_STATUS.ARRIVED,
          updater: context.state.user
        })

        return foundArrivalNotice
      } catch (e) {
        throw e
      }
    })
  }
}
