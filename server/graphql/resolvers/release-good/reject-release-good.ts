import { getManager, getRepository } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory, ReleaseGood, ShippingOrder } from '../../../entities'

export const rejectReleaseGood = {
  async rejectReleaseGood(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderInventories', 'deliveryOrders', 'shippingOrder']
        })

        if (!releaseGood) throw new Error(`Release good doesn't exists.`)
        if (!patch.remark) throw new Error('Remark is not exist.')
        if (releaseGood.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        let foundDOs: DeliveryOrder[] = releaseGood.deliveryOrders

        // 1. Update status of order products (PENDING_RECEIVE => READY_TO_COLLECT)
        releaseGood.orderInventories.forEach(async (orderInventory: OrderInventory) => {
          await getRepository(OrderInventory).update(
            { domain: context.state.domain, name: orderInventory.name },
            { ...orderInventory, status: ORDER_PRODUCT_STATUS.REJECTED, updater: context.state.user }
          )
        })

        // 3. If there's collection order, update status of collection order (PENDING_RECEIVE => REJECTED)
        if (foundDOs) {
          foundDOs = foundDOs.map((dos: DeliveryOrder) => {
            return {
              ...dos,
              status: ORDER_STATUS.REJECTED,
              updater: context.state.user
            }
          })
          await getRepository(DeliveryOrder).save(foundDOs)
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
