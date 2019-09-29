import { Bizplace } from '@things-factory/biz-base'
import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository, In } from 'typeorm'
import { DeliveryOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants'

export const receiveDeliveryOrder = {
  async receiveDeliveryOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts']
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (!patch.transportVehicle.name && !patch.transportDriver.name)
          throw new Error('Driver and vehicle data not exist.')
        if (deliveryOrder.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (PENDING_RECEIVE => READY_TO_DELIVER)
        deliveryOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.READY_TO_DELIVER, updater: context.state.user }
          )
        })

        await getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          transportVehicle: await getRepository(TransportVehicle).findOne({
            where: {
              domain: context.state.domain,
              bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id)),
              name: patch.transportVehicle.name
            }
          }),
          transportDriver: await getRepository(TransportDriver).findOne({
            where: {
              domain: context.state.domain,
              bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id)),
              name: patch.transportDriver.name
            }
          }),
          status: ORDER_STATUS.READY_TO_DISPATCH,
          updater: context.state.user
        })

        return deliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
