import { getManager, getRepository } from 'typeorm'
import { CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, DRIVER_STATUS, TRUCK_STATUS } from '../../../enum'
import { TransportVehicle, TransportDriver } from '@things-factory/transport-base'

export const dispatchCollectionOrder = {
  async dispatchCollectionOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts', 'transportDriver', 'transportVehicle']
        })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (collectionOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (READY_TO_COLLECT => INTRANSIT) & status of collection order  (READY_TO_DISPATCH => COLLECTING)
        collectionOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.INTRANSIT, updater: context.state.user }
          )
        })

        // 2. Check whether transport driver is involved in.
        if (collectionOrder.transportDriver) {
          // 2. 1) if it's yes update status of driver status
          const transportDriver: TransportDriver = await getRepository(TransportDriver).findOne({
            where: { domain: context.state.domain, name: collectionOrder.transportDriver.name }
          })

          await getRepository(TransportDriver).save({
            ...transportDriver,
            status: DRIVER_STATUS.OCCUPIED,
            updater: context.state.user
          })
        }

        // 3. Check whether transport vehicle is involved in.
        if (collectionOrder.transportVehicle) {
          // 3. 1) if it's yes update status of vehicle status
          const transportVehicle: TransportVehicle = await getRepository(TransportDriver).findOne({
            where: { domain: context.state.domain, name: collectionOrder.transportVehicle.name }
          })

          await getRepository(TransportVehicle).save({
            ...transportVehicle,
            status: TRUCK_STATUS.IN_USE,
            updater: context.state.user
          })
        }

        await getRepository(CollectionOrder).save({
          ...collectionOrder,
          status: ORDER_STATUS.COLLECTING,
          updater: context.state.user
        })

        return collectionOrder
      } catch (e) {
        throw e
      }
    })
  }
}
