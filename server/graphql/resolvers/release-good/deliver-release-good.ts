import { getManager, getRepository } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory, ReleaseGood, ShippingOrder } from '../../../entities'

export const deliverReleaseGood = {
  async deliverReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderInventories', 'shippingOrder', 'deliveryOrders']
        })

        if (!releaseGood) throw new Error(`Release good doesn't exists.`)
        if (releaseGood.status !== ORDER_STATUS.INPROCESS) throw new Error(`Status is not receivable.`)

        let foundDOs: DeliveryOrder[] = releaseGood.deliveryOrders

        // 1. Update status of order products (READY_TO_PICK => PICKING)
        releaseGood.orderInventories.forEach(async (orderInventory: OrderInventory) => {
          await getRepository(OrderInventory).update(
            { domain: context.state.domain, name: orderInventory.name },
            { ...orderInventory, status: ORDER_PRODUCT_STATUS.DELIVERING, updater: context.state.user }
          )
        })

        // 3. Check whether shipping order is invloved in.
        if (releaseGood.shippingOrder) {
          // 3. 1) if it's yes update status of shipping order
          const shippingOrder: ShippingOrder = await getRepository(ShippingOrder).findOne({
            where: { domain: context.state.domain, name: releaseGood.shippingOrder.name }
          })

          await getRepository(ShippingOrder).save({
            ...shippingOrder,
            status: ORDER_STATUS.DELIVERING,
            updater: context.state.user
          })
        }

        if (foundDOs) {
          //update deliveryOrder
          foundDOs = foundDOs.map((dos: DeliveryOrder) => {
            return {
              ...dos,
              status: ORDER_STATUS.DELIVERING,
              updater: context.state.user
            }
          })
          await getRepository(DeliveryOrder).save(foundDOs)
        }

        await getRepository(ReleaseGood).save({
          ...releaseGood,
          status: ORDER_STATUS.DELIVERING,
          updater: context.state.user
        })

        return releaseGood
      } catch (e) {
        throw e
      }
    })
  }
}
