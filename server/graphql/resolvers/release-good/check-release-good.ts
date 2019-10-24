import { getManager, getRepository } from 'typeorm'
import { ORDER_INVENTORY_STATUS, ORDER_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory, ReleaseGood, ShippingOrder } from '../../../entities'

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

        // 1. Update Delivery Order status
        let foundDOs: DeliveryOrder[] = releaseGood.deliveryOrders
        foundDOs = foundDOs.map((dos: DeliveryOrder) => {
          return {
            ...dos,
            status: ORDER_STATUS.DONE,
            updater: context.state.user
          }
        })
        await getRepository(DeliveryOrder).save(foundDOs)

        // 2. Update status of order products
        releaseGood.orderInventories.forEach(async (orderInventory: OrderInventory) => {
          await getRepository(OrderInventory).update(
            { id: orderInventory.id },
            { ...orderInventory, status: ORDER_INVENTORY_STATUS.RELEASED, updater: context.state.user }
          )
        })

        await getRepository(ReleaseGood).save({
          ...releaseGood,
          status: ORDER_STATUS.DONE,
          updater: context.state.user
        })

        // 3. Check whether delivery order is invloved in.
        if (releaseGood.shippingOrder) {
          // 4. 1) if it's yes update status of delivery order
          const shippingOrder: ShippingOrder = await getRepository(ShippingOrder).findOne({
            where: { domain: context.state.domain, name: releaseGood.shippingOrder.name }
          })

          await getRepository(ShippingOrder).save({
            ...shippingOrder,
            status: ORDER_STATUS.DONE,
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
