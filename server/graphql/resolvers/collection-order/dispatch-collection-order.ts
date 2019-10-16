import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS, ORDER_TYPES } from '../../../constants'
import { CollectionOrder, TransportOrderDetail } from '../../../entities'
import { OrderNoGenerator } from 'server/utils'
import { collectionOrderRequestsResolver } from './collection-order-requests'

export const dispatchCollectionOrder = {
  async dispatchCollectionOrder(_: any, { collectionOrder }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const foundCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name: collectionOrder.name }
        })

        if (!foundCollectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (foundCollectionOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        // map assigned drivers and vehicles to transportOrderDetail
        const transportOrderDetail = collectionOrder.transportOrderDetails.map(async od => {
          return {
            ...od,
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            name: OrderNoGenerator.transportOrderDetail(),
            transportDriver: await getRepository(TransportDriver).findOne({
              domain: context.state.domain,
              id: od.transportDriver.id
            }),
            transportVehicle: await getRepository(TransportVehicle).findOne({
              domain: context.state.domain,
              id: od.transportVehicle.id
            }),
            collectionOrder: foundCollectionOrder,
            type: ORDER_TYPES.COLLECTION,
            creator: context.state.user,
            updater: context.state.user
          }
        })
        await getRepository(TransportOrderDetail).save(transportOrderDetail)

        await getRepository(CollectionOrder).save({
          ...foundCollectionOrder,
          status: ORDER_STATUS.COLLECTING,
          updater: context.state.user
        })

        return foundCollectionOrder
      } catch (e) {
        throw e
      }
    })
  }
}
