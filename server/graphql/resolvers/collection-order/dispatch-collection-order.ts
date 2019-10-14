import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS, ORDER_TYPES } from '../../../constants'
import { CollectionOrder, TransportOrderDetail } from '../../../entities'

export const dispatchCollectionOrder = {
  async dispatchCollectionOrder(_: any, { name, orderDetails }, context: any) {
    return await getManager().transaction(async trxMgr => {
      try {
        const collectionOrder: CollectionOrder = await trxMgr.getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name }
        })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (collectionOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        // map assigned drivers and vehicles to transportOrderDetail
        const transportOrderDetail = orderDetails.map(async od => {
          return {
            domain: context.state.domain,
            bizplace: context.state.mainBizplace,
            transportDriver: await trxMgr.getRepository(TransportDriver).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: od.transportDriver.name
              }
            }),
            transportVehicle: await trxMgr.getRepository(TransportVehicle).findOne({
              where: {
                domain: context.state.domain,
                bizplace: context.state.mainBizplace,
                name: od.transportVehicle.name
              }
            }),
            collectionOrder: collectionOrder,
            type: ORDER_TYPES.COLLECTION,
            creator: context.state.user,
            updater: context.state.user
          }
        })
        await trxMgr.getRepository(TransportOrderDetail).save(transportOrderDetail)

        await trxMgr.getRepository(CollectionOrder).save({
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
