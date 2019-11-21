import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager } from 'typeorm'
import { ORDER_STATUS, ORDER_TYPES } from '../../../constants'
import { CollectionOrder, TransportOrderDetail } from '../../../entities'
import { OrderNoGenerator } from '../../../utils'

export const dispatchCollectionOrder = {
  async dispatchCollectionOrder(_: any, { orderInfo }, context: any) {
    return await getManager().transaction(async trxMgr => {
      let transportOrderDetails: TransportOrderDetail[] = orderInfo.transportOrderDetails
      const myBizplace: Bizplace = await getMyBizplace(context.state.user)

      try {
        const foundCollectionOrder: CollectionOrder = await trxMgr.getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name: orderInfo.name }
        })

        if (!foundCollectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (foundCollectionOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        // map assigned drivers and vehicles to transportOrderDetail
        // 2. Create transportOrderDetails
        transportOrderDetails = await Promise.all(
          transportOrderDetails.map(async (tod: TransportOrderDetail) => {
            return {
              ...tod,
              domain: context.state.domain,
              bizplace: myBizplace,
              name: OrderNoGenerator.transportOrderDetail(),
              transportDriver: await trxMgr.getRepository(TransportDriver).findOne({
                domain: context.state.domain,
                id: tod.transportDriver.id
              }),
              transportVehicle: await trxMgr.getRepository(TransportVehicle).findOne({
                domain: context.state.domain,
                id: tod.transportVehicle.id
              }),
              collectionOrder: foundCollectionOrder,
              type: ORDER_TYPES.DELIVERY,
              creator: context.state.user,
              updater: context.state.user
            }
          })
        )
        await trxMgr.getRepository(TransportOrderDetail).save(transportOrderDetails)

        await trxMgr.getRepository(CollectionOrder).save({
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
