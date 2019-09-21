import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository, In } from 'typeorm'
import { CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../enum'
import { Bizplace } from '@things-factory/biz-base'

export const dispatchCollectionOrder = {
  async dispatchCollectionOrder(_: any, { name, patch }, context: any) {
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

        await getRepository(CollectionOrder).save({
          ...collectionOrder,
          transportVehicle: await getRepository(TransportVehicle).findOne({
            where: {
              domain: context.state.domain,
              bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id)),
              name: patch.transportVehicle.name
            }
          }),
          transportDriver: await getRepository(TransportDriver).findOne({
            where: {
              domain: context.state.domain,
              bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id)),
              name: patch.transportDriver.name
            }
          }),

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
