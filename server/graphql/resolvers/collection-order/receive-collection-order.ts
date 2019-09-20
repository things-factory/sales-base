import { getManager } from 'typeorm'
import { CollectionOrder, OrderProduct } from '../../../entities'
import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, DRIVER_STATUS, TRUCK_STATUS } from '../../../enum'

export const receiveCollectionOrder = {
  async receiveCollectionOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {
      try {
        const collectionOrder: CollectionOrder = await transactionalEntityManager
          .getRepository(CollectionOrder)
          .findOne({
            where: { domain: context.state.domain, name },
            relations: ['orderProducts']
          })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (collectionOrder.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (PENDING_RECEIVE => READY_TO_COLLECT)
        collectionOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await transactionalEntityManager
            .getRepository(OrderProduct)
            .update(
              { domain: context.state.domain, name: orderProduct.name },
              { ...orderProduct, status: ORDER_PRODUCT_STATUS.READY_TO_COLLECT, updater: context.state.user }
            )
        })

        // 2. Check whether transport driver is involved in.
        if (collectionOrder.transportDriver) {
          // 2. 1) if it's yes update status of driver status
          const transportDriver: TransportDriver = await transactionalEntityManager
            .getRepository(TransportDriver)
            .findOne({
              where: { domain: context.state.domain, name: collectionOrder.transportDriver.name }
            })

          await transactionalEntityManager.getRepository(TransportDriver).save({
            ...transportDriver,
            status: DRIVER_STATUS.OCCUPIED,
            updater: context.state.user
          })
        }

        // 3. Check whether transport vehicle is involved in.
        if (collectionOrder.transportVehicle) {
          // 3. 1) if it's yes update status of vehicle status
          const transportVehicle: TransportVehicle = await transactionalEntityManager
            .getRepository(TransportDriver)
            .findOne({
              where: { domain: context.state.domain, name: collectionOrder.transportVehicle.name }
            })

          await transactionalEntityManager.getRepository(TransportVehicle).save({
            ...transportVehicle,
            status: TRUCK_STATUS.IN_USE,
            updater: context.state.user
          })
        }

        await transactionalEntityManager.getRepository(CollectionOrder).save({
          ...collectionOrder,
          ...patch,
          status: ORDER_STATUS.READY_TO_DISPATCH,
          updater: context.state.user
        })

        return collectionOrder
      } catch (e) {
        throw e
      }
    })
  }
}
