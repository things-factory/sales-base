import { getManager } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'
import { TransportDriver, TransportVehicle, TRUCK_STATUS } from '@things-factory/transport-base'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { orderInfo }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const foundDeliveryOrder: DeliveryOrder = await trxMgr.getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name: orderInfo.name },
          relations: ['transportVehicle']
        })

        if (!foundDeliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (foundDeliveryOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        let foundTruck
        if (!foundDeliveryOrder?.ownCollection) {
          foundTruck = foundDeliveryOrder.transportVehicle
          await trxMgr.getRepository(TransportVehicle).save({
            ...foundTruck,
            status: TRUCK_STATUS.IN_USE,
            updater: context.state.user
          })
        } else {
          foundTruck = foundDeliveryOrder.truckNo
        }

        if (orderInfo?.driverName) {
          const foundDriver = await trxMgr.getRepository(TransportDriver).findOne({
            where: { domain: context.state.domain, name: orderInfo.driverName }
          })
          await trxMgr.getRepository(DeliveryOrder).save({
            ...foundDeliveryOrder,
            transportDriver: foundDriver || null,
            to: orderInfo.to,
            deliveryDate: orderInfo.deliveryDate,
            status: ORDER_STATUS.DELIVERING,
            updater: context.state.user
          })
        } else {
          await trxMgr.getRepository(DeliveryOrder).save({
            ...foundDeliveryOrder,
            to: orderInfo.to,
            deliveryDate: orderInfo.deliveryDate,
            status: ORDER_STATUS.DELIVERING,
            updater: context.state.user
          })
        }

        return foundDeliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
