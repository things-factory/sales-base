import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['transportDriver', 'transportVehicle']
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (deliveryOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        if (patch && patch.transportVehicle && patch.transportVehicle.name) {
          deliveryOrder.transportVehicle = await getRepository(TransportVehicle).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: patch.transportVehicle.name
            }
          })
        }

        if (patch && patch.transportDriver && patch.transportDriver.name) {
          deliveryOrder.transportDriver = await getRepository(TransportDriver).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: patch.transportDriver.name
            }
          })
        }

        await getRepository(DeliveryOrder).save({
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
