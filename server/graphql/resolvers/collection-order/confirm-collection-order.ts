import { getManager, getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'
import { ORDER_STATUS } from '../../../enum'

export const confirmCollectionOrder = {
  async confirmCollectionOrder(_: any, { name }, context: any) {
    const foundCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['orderProducts', 'orderProducts.product', 'orderVass', 'orderVass.vas', 'creator', 'updater']
    })

    return await getManager().transaction(async transactionalEntityManager => {
      let collectionOrder: CollectionOrder
      if (!foundCollectionOrder) throw new Error(`Collection Order doesn't exists.`)
      if (foundCollectionOrder.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // Collection Order Status change (PENDING => PENDING_RECEIVE)
      collectionOrder = await transactionalEntityManager.getRepository(CollectionOrder).save({
        ...foundCollectionOrder,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      return collectionOrder
    })
  }
}
