import { getManager, getRepository } from 'typeorm'
import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS, DRIVER_STATUS, TRUCK_STATUS } from '../../../enum'

export const checkCollectedOrder = {
  async checkCollectedOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts']
        })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (collectionOrder.status !== ORDER_STATUS.COLLECTING) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products & status of arrival notice  (COLLECTING => COLLECTED)
        collectionOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.COLLECTED, updater: context.state.user }
          )
        })

        // 2. Check whether driver is invloved in.
        if (collectionOrder.transportDriver) {
          // 2. 1) if it's yes update status of driver
          const transportDriver: TransportDriver = await getRepository(TransportDriver).findOne({
            where: { domain: context.state.domain, name: collectionOrder.transportDriver.name }
          })

          await getRepository(TransportDriver).save({
            ...transportDriver,
            status: DRIVER_STATUS.AVAILABLE,
            updater: context.state.user
          })
        }

        // 3. Check whether truck is invloved in.
        if (collectionOrder.transportDriver) {
          // 3. if it's yes update status of truck
          const transportVehicle: TransportVehicle = await getRepository(TransportVehicle).findOne({
            where: { domain: context.state.domain, name: collectionOrder.transportVehicle.name }
          })

          await getRepository(TransportVehicle).save({
            ...transportVehicle,
            status: TRUCK_STATUS.AVAILABLE,
            updater: context.state.user
          })
        }

        await getRepository(CollectionOrder).save({
          ...collectionOrder,
          status: ORDER_STATUS.DONE,
          updater: context.state.user
        })

        return collectionOrder
      } catch (e) {
        throw e
      }
    })
  }
}
