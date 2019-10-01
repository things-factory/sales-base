import { getManager, getRepository, Collection } from 'typeorm'
import { ArrivalNotice, CollectionOrder, OrderProduct, OrderVas } from '../../../entities'
import { ORDER_STATUS, ORDER_PRODUCT_STATUS, ORDER_VAS_STATUS } from '../../../constants'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const confirmArrivalNotice = {
  async confirmArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      const foundArrivalNotice: ArrivalNotice = await getRepository(ArrivalNotice).findOne({
        where: { domain: context.state.domain, name },
        relations: [
          'collectionOrder',
          'orderProducts',
          'orderProducts.product',
          'orderVass',
          'orderVass.vas',
          'creator',
          'updater'
        ]
      })

      const foundCO: CollectionOrder = foundArrivalNotice.collectionOrder
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
      if (foundCO)
        await getRepository(CollectionOrder).save({
          ...foundCO,
          status: ORDER_STATUS.PENDING_RECEIVE,
          updater: context.state.user
        })

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
