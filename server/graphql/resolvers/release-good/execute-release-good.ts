import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants'
import { DeliveryOrder, OrderInventory, ReleaseGood, ShippingOrder } from '../../../entities'

export const executeReleaseGood = {
  async executeReleaseGood(_: any, { name, deliveryOrderPatch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
          where: { domain: context.state.domain, name },
          relations: [
            'orderInventories',
            'shippingOrder',
            'deliveryOrder',
            'deliveryOrder.transportDriver',
            'deliveryOrder.transportVehicle'
          ]
        })

        if (!releaseGood) throw new Error(`Release good doesn't exists.`)
        if (releaseGood.status !== ORDER_STATUS.READY_TO_PICK) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (READY_TO_PICK => PICKING)
        releaseGood.orderInventories.forEach(async (orderInventory: OrderInventory) => {
          await getRepository(OrderInventory).update(
            { domain: context.state.domain, name: orderInventory.name },
            { ...orderInventory, status: ORDER_PRODUCT_STATUS.PICKING, updater: context.state.user }
          )
        })

        // 3. Check whether shipping order is invloved in.
        if (releaseGood.shippingOrder) {
          // 3. 1) if it's yes update status of shipping order
          const shippingOrder: ShippingOrder = await getRepository(ShippingOrder).findOne({
            where: { domain: context.state.domain, name: releaseGood.shippingOrder.name }
          })

          await getRepository(ShippingOrder).save({
            ...shippingOrder,
            status: ORDER_STATUS.INPROCESS,
            updater: context.state.user
          })
        }

        //update deliveryOrder
        if (releaseGood.deliveryOrder) {
          releaseGood.deliveryOrder = await getRepository(DeliveryOrder).findOne({
            where: { domain: context.state.domain, id: releaseGood.deliveryOrder.id },
            relations: ['transportDriver', 'transportVehicle']
          })
          //from the transport driver name, find ID
          if (deliveryOrderPatch && deliveryOrderPatch.transportVehicle && deliveryOrderPatch.transportVehicle.name) {
            releaseGood.deliveryOrder.transportVehicle = await getRepository(TransportVehicle).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: deliveryOrderPatch.transportVehicle.name
              }
            })
          }

          //from the transport vehicle name, find ID
          if (deliveryOrderPatch && deliveryOrderPatch.transportDriver && deliveryOrderPatch.transportDriver.name) {
            releaseGood.deliveryOrder.transportDriver = await getRepository(TransportDriver).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: deliveryOrderPatch.transportDriver.name
              }
            })
          }

          await getRepository(DeliveryOrder).save({
            ...releaseGood.deliveryOrder,
            updater: context.state.user
          })
        }

        await getRepository(ReleaseGood).save({
          ...releaseGood,
          status: ORDER_STATUS.INPROCESS,
          updater: context.state.user
        })

        return releaseGood
      } catch (e) {
        throw e
      }
    })
  }
}
