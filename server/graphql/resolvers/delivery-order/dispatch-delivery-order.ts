import { getManager, getRepository } from 'typeorm'
import { DeliveryOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, DRIVER_STATUS, TRUCK_STATUS } from '../../../enum'
import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts', 'transportDriver', 'transportVehicle']
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (deliveryOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (READY_TO_COLLECT => INTRANSIT) & status of delivery order  (READY_TO_DISPATCH => COLLECTING)
        deliveryOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.INTRANSIT, updater: context.state.user }
          )
        })

        // 2. Check whether transport driver is involved in.
        if (deliveryOrder.transportDriver) {
          // 2. 1) if it's yes update status of driver status
          const transportDriver: TransportDriver = await getRepository(TransportDriver).findOne({
            where: { domain: context.state.domain, name: deliveryOrder.transportDriver.name }
          })

          await getRepository(TransportDriver).save({
            ...transportDriver,
            status: DRIVER_STATUS.OCCUPIED,
            updater: context.state.user
          })
        }

        // 3. Check whether transport vehicle is involved in.
        if (deliveryOrder.transportVehicle) {
          // 3. 1) if it's yes update status of vehicle status
          const transportVehicle: TransportVehicle = await getRepository(TransportDriver).findOne({
            where: { domain: context.state.domain, name: deliveryOrder.transportVehicle.name }
          })

          await getRepository(TransportVehicle).save({
            ...transportVehicle,
            status: TRUCK_STATUS.IN_USE,
            updater: context.state.user
          })
        }

        await getRepository(DeliveryOrder).save({
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
