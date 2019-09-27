import { getManager, getRepository } from 'typeorm'
import { DeliveryOrder, OrderInventory, ReleaseGood, ShippingOrder } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'

export const receiveReleaseGood = {
  async receiveReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
          where: { domain: context.state.domain, name },
          relations: ['deliveryOrder', 'shippingOrder', 'orderInventories']
        })

        if (!releaseGood) throw new Error(`Release good doesn't exists.`)
        if (releaseGood.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products  (PENDING_RECEIVE => INTRANSIT)
        releaseGood.orderInventories.forEach(async (orderInventory: OrderInventory) => {
          await getRepository(OrderInventory).update(
            { id: orderInventory.id },
            { ...orderInventory, status: ORDER_PRODUCT_STATUS.READY_TO_PICK, updater: context.state.user }
          )
        })

        await getRepository(ReleaseGood).save({
          ...releaseGood,
          status: ORDER_STATUS.READY_TO_PICK,
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
            status: ORDER_STATUS.READY_TO_DISPATCH,
            updater: context.state.user
          })
        }

        // 3. Check whether shipping order is invloved in.
        if (releaseGood.shippingOrder) {
          // 3. 1) if it's yes update status of shipping order
          const shippingOrder: ShippingOrder = await getRepository(ShippingOrder).findOne({
            where: { domain: context.state.domain, name: releaseGood.shippingOrder.name }
          })

          await getRepository(ShippingOrder).save({
            ...shippingOrder,
            status: ORDER_STATUS.READY_TO_PICK,
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
