import { getManager, getRepository } from 'typeorm'
import { CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'
import { TransportVehicle, TransportDriver } from '@things-factory/transport-base'

export const receiveCollectionOrder = {
  async receiveCollectionOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['orderProducts']
        })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (!patch) throw new Error('Driver and vehicle data not exist.')
        if (collectionOrder.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        // 1. Update status of order products (PENDING_RECEIVE => READY_TO_COLLECT)
        collectionOrder.orderProducts.forEach(async (orderProduct: OrderProduct) => {
          await getRepository(OrderProduct).update(
            { domain: context.state.domain, name: orderProduct.name },
            { ...orderProduct, status: ORDER_PRODUCT_STATUS.READY_TO_COLLECT, updater: context.state.user }
          )
        })

        await getRepository(CollectionOrder).save({
          ...collectionOrder,
          transportVehicle: await getRepository(TransportVehicle).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.bizplaces[0],
              name: patch.transportVehicle.name
            }
          }),
          transportDriver: await getRepository(TransportDriver).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.bizplaces[0],
              name: patch.transportDriver.name
            }
          }),
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
