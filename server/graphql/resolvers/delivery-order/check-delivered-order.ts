import { getManager, getRepository } from 'typeorm'
import { TransportVehicle, TRUCK_STATUS } from '@things-factory/transport-base'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'

export const checkDeliveredOrder = {
  async checkDeliveredOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['bizplace', 'transportDriver', 'transportVehicle']
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (deliveryOrder.status !== ORDER_STATUS.DELIVERING) throw new Error(`Status is not receivable.`)

        await getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          ...patch,
          status: ORDER_STATUS.DONE,
          updater: context.state.user
        })

        if (!deliveryOrder?.ownCollection) {
          const foundTruck: TransportVehicle = deliveryOrder.transportVehicle
          await getRepository(TransportVehicle).save({
            ...foundTruck,
            status: TRUCK_STATUS.IDLE,
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
