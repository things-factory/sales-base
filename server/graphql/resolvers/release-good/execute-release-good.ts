import { getManager, getRepository } from 'typeorm'
import { OrderProduct, ReleaseGood, ShippingOrder, OrderInventory } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'

export const executeReleaseGood = {
  async executeReleaseGood(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts', 'shippingOrder']
        })

        if (!releaseGood) throw new Error(`Release good doesn't exists.`)
        if (releaseGood.status !== ORDER_STATUS.READY_TO_PICK) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (READY_TO_COLLECT => INTRANSIT)
        releaseGood.orderInventories.forEach(async (orderInventory: OrderInventory) => {
          await getRepository(OrderInventory).update(
            { domain: context.state.domain, name: orderInventory.name },
            { ...orderInventory, status: ORDER_PRODUCT_STATUS.PICKING, updater: context.state.user }
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
            status: ORDER_STATUS.PICKING,
            updater: context.state.user
          })
        }

        await getRepository(ReleaseGood).save({
          ...releaseGood,
          status: ORDER_STATUS.PICKING,
          updater: context.state.user
        })

        return releaseGood
      } catch (e) {
        throw e
      }
    })
  }
}
