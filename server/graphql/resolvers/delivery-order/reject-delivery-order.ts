import { getManager, getRepository } from 'typeorm'
import { DeliveryOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'

export const rejectDeliveryOrder = {
  async rejectDeliveryOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts']
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (!patch.remark) throw new Error('Remark is empty.')
        if (deliveryOrder.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (PENDING_RECEIVE => READY_TO_DELIVER)
        deliveryOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.REJECTED, updater: context.state.user }
          )
        })

        await getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          ...patch,
          status: ORDER_STATUS.REJECTED,
          updater: context.state.user
        })

        return deliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
