import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository, In } from 'typeorm'
import { DeliveryOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'
import { Bizplace } from '@things-factory/biz-base'

export const dispatchDeliveryOrder = {
  async dispatchDeliveryOrder(_: any, { name, patch }, context: any) {
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

        if (patch && patch.transportVehicle && patch.transportVehicle.name) {
          deliveryOrder.transportVehicle = await getRepository(TransportVehicle).findOne({
            where: {
              domain: context.state.domain,
              bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id)),
              name: patch.transportVehicle.name
            }
          })
        }

        if (patch && patch.transportDriver && patch.transportDriver.name) {
          deliveryOrder.transportDriver = await getRepository(TransportDriver).findOne({
            where: {
              domain: context.state.domain,
              bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id)),
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
