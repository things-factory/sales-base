import { getManager, getRepository } from 'typeorm'
import { ReleaseGood, DeliveryOrder, ShippingOrder, OrderInventory } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants'

export const checkReleaseGood = {
  async checkReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
          where: { domain: context.state.domain, name },
          relations: ['deliveryOrder', 'shippingOrder', 'orderInventories']
        })

        if (!releaseGood) throw new Error(`Release good doesn't exists.`)
        if (releaseGood.status !== ORDER_STATUS.INPROCESS) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products
        releaseGood.orderInventories.forEach(async (orderInventory: OrderInventory) => {
          await getRepository(OrderInventory).update(
            { id: orderInventory.id },
            { ...orderInventory, status: ORDER_PRODUCT_STATUS.RELEASED, updater: context.state.user }
          )
        })

        await getRepository(ReleaseGood).save({
          ...releaseGood,
          status: ORDER_STATUS.DONE,
          updater: context.state.user
        })

        // 2. Check whether delivery order is invloved in.
        if (releaseGood.deliveryOrder) {
          // 2. 1) if it's yes update status of delivery order
          const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
            where: { domain: context.state.domain, name: releaseGood.deliveryOrder.name }
          })

          await getRepository(DeliveryOrder).save({
            ...deliveryOrder,
            status: ORDER_STATUS.DELIVERING,
            updater: context.state.user
          })
        }

        // 2. Check whether delivery order is invloved in.
        if (releaseGood.shippingOrder) {
          // 2. 1) if it's yes update status of delivery order
          const shippingOrder: ShippingOrder = await getRepository(ShippingOrder).findOne({
            where: { domain: context.state.domain, name: releaseGood.shippingOrder.name }
          })

          await getRepository(ShippingOrder).save({
            ...shippingOrder,
            status: ORDER_STATUS.SHIPPING,
            updater: context.state.user
          })
        }

        return releaseGood
      } catch (e) {
        throw e
      }
    })
  }
}
