import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS, ORDER_TYPES } from '../../../constants'
import { DeliveryOrder, TransportOrderDetail } from '../../../entities'
import { OrderNoGenerator } from '../../../utils/order-no-generator'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { deliveryOrder }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const foundDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name: deliveryOrder.name }
        })

        if (!foundDeliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (foundDeliveryOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        // map assigned drivers and vehicles to transportOrderDetail
        const transportOrderDetail = deliveryOrder.transportOrderDetails.map(async od => {
          return {
            ...od,
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            name: OrderNoGenerator.transportOrderDetail(),
            transportDriver: await getRepository(TransportDriver).findOne({
              domain: context.state.domain,
              id: od.transportDriver.id
            }),
            transportVehicle: await getRepository(TransportVehicle).findOne({
              domain: context.state.domain,
              id: od.transportVehicle.id
            }),
            deliveryOrder: foundDeliveryOrder,
            type: ORDER_TYPES.DELIVERY,
            creator: context.state.user,
            updater: context.state.user
          }
        })
        await getRepository(TransportOrderDetail).save(transportOrderDetail)

        await getRepository(DeliveryOrder).save({
          ...foundDeliveryOrder,
          status: ORDER_STATUS.DELIVERING,
          updater: context.state.user
        })

        return foundDeliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
