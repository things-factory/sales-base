import { TransportDriver, TransportVehicle } from '@things-factory/transport-base'
import { getManager, getRepository, In } from 'typeorm'
import { CollectionOrder, OrderProduct } from '../../../entities'
import { ORDER_PRODUCT_STATUS, ORDER_STATUS } from '../../../constants'
import { Bizplace } from '@things-factory/biz-base'

export const dispatchCollectionOrder = {
  async dispatchCollectionOrder(_: any, { name, patch }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name },
          relations: ['transportDriver', 'transportVehicle']
        })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (collectionOrder.status !== ORDER_STATUS.READY_TO_DISPATCH) throw new Error(`Status is not receivable.`)

        if (patch && patch.transportVehicle && patch.transportVehicle.name) {
          collectionOrder.transportVehicle = await getRepository(TransportVehicle).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: patch.transportVehicle.name
            }
          })
        }

        if (patch && patch.transportDriver && patch.transportDriver.name) {
          collectionOrder.transportDriver = await getRepository(TransportDriver).findOne({
            where: {
              domain: context.state.domain,
              bizplace: context.state.mainBizplace,
              name: patch.transportDriver.name
            }
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
