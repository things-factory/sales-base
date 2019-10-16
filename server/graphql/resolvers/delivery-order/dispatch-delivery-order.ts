import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS, ORDER_TYPES } from '../../../constants'
import { DeliveryOrder, TransportOrderDetail } from '../../../entities'
import { OrderNoGenerator } from '../../../utils'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { deliveryOrder }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const foundDeliveryOrder: DeliveryOrder = await trxMgr.getRepository(DeliveryOrder).findOne({
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
            transportDriver: await trxMgr.getRepository(TransportDriver).findOne({
              domain: context.state.domain,
              id: od.transportDriver.id
            }),
            transportVehicle: await trxMgr.getRepository(TransportVehicle).findOne({
              domain: context.state.domain,
              id: od.transportVehicle.id
            }),
            deliveryOrder: foundDeliveryOrder,
            type: ORDER_TYPES.DELIVERY,
            creator: context.state.user,
            updater: context.state.user
          }
        })
        await trxMgr.getRepository(TransportOrderDetail).save(transportOrderDetail)

        await trxMgr.getRepository(DeliveryOrder).save({
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
