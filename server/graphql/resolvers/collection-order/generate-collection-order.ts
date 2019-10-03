import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { CollectionOrder } from '../../../entities'

export const generateCollectionOrder = {
  async generateCollectionOrder(_: any, { collectionOrder }, context: any) {
    return await getManager().transaction(async () => {
      const newCollectionOrder = collectionOrder.collectionOrder

      // 1. Create collection order
      const createdCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).save({
        ...newCollectionOrder,
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user
      })

      return createdCollectionOrder
    })
  }
}
