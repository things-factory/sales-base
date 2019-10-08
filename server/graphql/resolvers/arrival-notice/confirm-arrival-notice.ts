import { getManager, getRepository } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas } from '../../../entities'

export const confirmArrivalNotice = {
  async confirmArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
        where: { domain: context.state.domain, name },
        relations: [
          'collectionOrders',
          'orderProducts',
          'orderProducts.product',
          'orderVass',
          'orderVass.vas',
          'creator',
          'updater'
        ]
      })

      let foundCOs: CollectionOrder[] = await getRepository(CollectionOrder).find({
        where: { domain: context.state.domain, refNo: foundArrivalNotice.name }
      })
      let foundOPs: OrderProduct[] = foundArrivalNotice.orderProducts
      let foundOVs: OrderVas[] = foundArrivalNotice.orderVass

      if (!foundArrivalNotice) throw new Error(`Arrival notice doesn't exists.`)
      if (foundArrivalNotice.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // 1. GAN Status change (PENDING => PENDING_RECEIVE)
      const arrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).save({
        ...foundArrivalNotice,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      // 2. Update collection order status
      if (foundCOs) {
        foundCOs = foundCOs.map((co: CollectionOrder) => {
          return { ...co, status: ORDER_STATUS.PENDING_RECEIVE, updater: context.state.user }
        })
        await getRepository(CollectionOrder).save(foundCOs)
      }

      foundOPs = foundOPs.map((op: OrderProduct) => {
        return { ...op, status: ORDER_PRODUCT_STATUS.PENDING_RECEIVE }
      })
      await getRepository(OrderProduct).save(foundOPs)

      // 3. Update order vas status if it exists.
      if (foundOVs && foundOVs.length) {
        foundOVs = foundOVs.map((ov: OrderVas) => {
          return { ...ov, status: ORDER_VAS_STATUS.PENDING_RECEIVE }
        })

        await getRepository(OrderVas).save(foundOVs)
      }
      return arrivalNotice
    })
  }
}
