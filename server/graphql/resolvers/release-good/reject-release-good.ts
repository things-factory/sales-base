import { getManager, getRepository } from 'typeorm'
import { ReleaseGood, OrderProduct, DeliveryOrder, ShippingOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'

export const rejectReleaseGood = {
  async rejectReleaseGood(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts', 'deliveryOrder', 'shippingOrder']
        })

        if (!releaseGood) throw new Error(`Release good doesn't exists.`)
        if (!patch.remark) throw new Error('Remark is not exist.')
        if (releaseGood.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (PENDING_RECEIVE => READY_TO_COLLECT)
        releaseGood.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.REJECTED, updater: context.state.user }
          )
        })

        if (releaseGood.deliveryOrder) {
          // 2. 1) if it's yes update status of collection order
          const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
            where: { domain: context.state.domain, name: releaseGood.deliveryOrder.name }
          })

          await getRepository(DeliveryOrder).save({
            ...deliveryOrder,
            status: ORDER_STATUS.REJECTED,
            updater: context.state.user
          })
        }

        if (releaseGood.shippingOrder) {
          // 2. 1) if it's yes update status of collection order
          const shippingOrder: ShippingOrder = await getRepository(ShippingOrder).findOne({
            where: { domain: context.state.domain, name: releaseGood.shippingOrder.name }
          })

          await getRepository(ShippingOrder).save({
            ...shippingOrder,
            status: ORDER_STATUS.REJECTED,
            updater: context.state.user
          })
        }

        await getRepository(ReleaseGood).save({
          ...releaseGood,
          ...patch,
          status: ORDER_STATUS.REJECTED,
          updater: context.state.user
        })

        return releaseGood
      } catch (e) {
        throw e
      }
    })
  }
}
