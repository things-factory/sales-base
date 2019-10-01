import { getManager, getRepository } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, OrderProduct, OrderVas } from '../../../entities'

export const checkArrivedNotice = {
  async checkArrivedNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name, status: ORDER_STATUS.INTRANSIT },
          relations: ['orderProducts', 'orderVass']
        })

        if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
        let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
        let foundOVs: OrderVas[] = foundArrivalNotice.orderVass

        // 1. Update status of order products (INTRANSIT => ARRIVED)
        foundOPs = foundOPs.map((op: OrderProduct) => {
          return {
            ...op,
            status: ORDER_PRODUCT_STATUS.ARRIVED,
            updater: context.state.user
          }
        })
        await getRepository(OrderProduct).save(foundOPs)

        // 2. Update status of order vass if it exists (INTRANSIT => READY_TO_PROCESS)
        if (foundOVs && foundOVs.length) {
          foundOVs = foundOVs.map((ov: OrderVas) => {
            return {
              ...ov,
              status: ORDER_VAS_STATUS.READY_TO_PROCESS,
              updater: context.state.user
            }
          })
          await getRepository(OrderVas).save(foundOVs)
        }

        // 3. Update status of arrival notice (INTRANSIT => ARRIVED)
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
