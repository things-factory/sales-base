import { getManager } from 'typeorm'
import { DeliveryOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      try {
        const deliveryOrder: DeliveryOrder = await transactionalEntityManager.getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts']
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (deliveryOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (READY_TO_COLLECT => INTRANSIT) & status of delivery order  (READY_TO_DISPATCH => COLLECTING)
        deliveryOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await transactionalEntityManager
            .getRepository(OrderProduct)
            .update(
              { id: orderProduct.id },
              { ...orderProduct, status: ORDER_PRODUCT_STATUS.INTRANSIT, updater: context.state.user }
            )
        })

        await transactionalEntityManager.getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          status: ORDER_STATUS.COLLECTING,
          updater: context.state.user
        })

        return deliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
