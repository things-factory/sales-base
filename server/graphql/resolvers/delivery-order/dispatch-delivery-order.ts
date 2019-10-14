import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager } from 'typeorm'
import { ORDER_STATUS, ORDER_TYPES } from '../../../constants'
import { DeliveryOrder, TransportOrderDetail } from '../../../entities'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { name, orderDetails }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const deliveryOrder: DeliveryOrder = await trxMgr.getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name }
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (deliveryOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        // map assigned drivers and vehicles to transportOrderDetail
        const transportOrderDetail = orderDetails.map(async od => {
          return {
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            transportDriver: await trxMgr.getRepository(TransportDriver).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: od.transportDriver.name
              }
            }),
            transportVehicle: await trxMgr.getRepository(TransportVehicle).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: od.transportVehicle.name
              }
            }),
            deliveryOrder: deliveryOrder,
            type: ORDER_TYPES.DELIVERY,
            creator: context.state.user,
            updater: context.state.user
          }
        })
        await trxMgr.getRepository(TransportOrderDetail).save(transportOrderDetail)

        await trxMgr.getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          status: ORDER_STATUS.DELIVERING,
          updater: context.state.user
        })

        return deliveryOrder
      } catch (e) {
        throw e
      }
    })
  }
}
