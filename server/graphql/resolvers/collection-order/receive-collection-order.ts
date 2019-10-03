import { getManager, getRepository, In } from 'typeorm'
import { CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants'
import { TransportVehicle, TransportDriver } from '@things-factory/transport-base'
import { Bizplace } from '@things-factory/biz-base'

export const receiveCollectionOrder = {
  async receiveCollectionOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name }
        })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (!patch.transportVehicle.name && !patch.transportDriver.name)
          throw new Error('Driver and vehicle data not exist.')
        if (collectionOrder.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        await getRepository(CollectionOrder).save({
          ...collectionOrder,
          transportVehicle: await getRepository(TransportVehicle).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: patch.transportVehicle.name
            }
          }),
          transportDriver: await getRepository(TransportDriver).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
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
