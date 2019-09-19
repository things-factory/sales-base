import { getManager } from 'typeorm'
import { DeliveryOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'

export const checkDeliveredOrder = {
  async checkDeliveredOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      try {
        const deliveryOrder: DeliveryOrder = await transactionalEntityManager.getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts']
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (deliveryOrder.status !== ORDER_STATUS.DELIVERING) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products & status of arrival notice  (DELIVERING => DELIVERED)
        deliveryOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await transactionalEntityManager
            .getRepository(OrderProduct)
            .update(
              { id: orderProduct.id },
              { ...orderProduct, status: ORDER_PRODUCT_STATUS.DELIVERED, updater: context.state.user }
            )
        })

        await transactionalEntityManager.getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          status: ORDER_STATUS.DONE,
          updater: context.state.user
        })

        return deliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
