import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { CollectionOrder } from '../../../entities'

export const receiveCollectionOrder = {
  async receiveCollectionOrder(_: any, { name }, context: any) {
    return await getManager().transaction(async () => {
      try {
        const collectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
          where: { domain: context.state.domain, name }
        })

        if (!collectionOrder) throw new Error(`Collection order doesn't exists.`)
        if (collectionOrder.status !== ORDER_STATUS.PENDING_RECEIVE) throw new Error(`Status is not receivable.`)

        await getRepository(CollectionOrder).save({
          ...collectionOrder,
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
