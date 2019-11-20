import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'
import { OrderNoGenerator } from '../../../utils'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { orderInfo }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const foundDeliveryOrder: DeliveryOrder = await trxMgr.getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name: orderInfo.name }
        })

        if (!foundDeliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (foundDeliveryOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        await trxMgr.getRepository(DeliveryOrder).save({
          ...foundDeliveryOrder,
          name: OrderNoGenerator.deliveryOrder(),
          transportDriver: await trxMgr.getRepository(TransportDriver).findOne({
            domain: context.state.domain,
            id: foundDeliveryOrder.transportDriver.id
          }),
          transportVehicle: await trxMgr.getRepository(TransportVehicle).findOne({
            domain: context.state.domain,
            id: foundDeliveryOrder.transportVehicle.id
          }),

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
