import { getManager, getRepository } from 'typeorm'
import { DeliveryOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, DRIVER_STATUS, TRUCK_STATUS } from '../../../enum'
import { TransportVehicle, TransportDriver } from '@things-factory/transport-base'

export const checkDeliveredOrder = {
  async checkDeliveredOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts', 'transportDriver', 'transportVehicle']
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (deliveryOrder.status !== ORDER_STATUS.DELIVERING) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products & status of arrival notice  (DELIVERING => DELIVERED)
        deliveryOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.DELIVERED, updater: context.state.user }
          )
        })

        await getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          status: ORDER_STATUS.DONE,
          updater: context.state.user
        })

        // 2. Check whether driver is invloved in.
        if (deliveryOrder.transportDriver) {
          // 2. 1) if it's yes update status of driver
          const transportDriver: TransportDriver = await getRepository(TransportDriver).findOne({
            where: { domain: context.state.domain, name: deliveryOrder.transportDriver.name }
          })

          await getRepository(TransportDriver).save({
            ...transportDriver,
            status: DRIVER_STATUS.AVAILABLE,
            updater: context.state.user
          })
        }

        // 3. Check whether truck is invloved in.
        if (deliveryOrder.transportDriver) {
          // 3. if it's yes update status of truck
          const transportVehicle: TransportVehicle = await getRepository(TransportVehicle).findOne({
            where: { domain: context.state.domain, name: deliveryOrder.transportVehicle.name }
          })

          await getRepository(TransportVehicle).save({
            ...transportVehicle,
            status: TRUCK_STATUS.AVAILABLE,
            updater: context.state.user
          })
        }

        return deliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
