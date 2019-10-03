import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'

export const receiveDeliveryOrder = {
  async receiveDeliveryOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
          where: { domain: context.state.domain, name }
        })

        if (!deliveryOrder) throw new Error(`Delivery order doesn't exists.`)
        if (!patch.transportVehicle.name && !patch.transportDriver.name)
          throw new Error('Driver and vehicle data not exist.')
        if (deliveryOrder.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        await getRepository(DeliveryOrder).save({
          ...deliveryOrder,
          transportVehicle: await getRepository(TransportVehicle).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: patch.transportVehicle.name
            }
          }),
          transportDriver: await getRepository(TransportDriver).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
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
