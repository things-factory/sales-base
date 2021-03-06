import { getManager, getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'
import { ORDER_STATUS } from '../../../constants'

export const confirmCollectionOrder = {
  async confirmCollectionOrder(_: any, { name }, context: any) {
    const foundCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['creator', 'updater']
    })

    return await getManager().transaction(async () => {
      let collectionOrder: CollectionOrder
      if (!foundCollectionOrder) throw new Error(`Collection Order doesn't exists.`)
      if (foundCollectionOrder.status !== ORDER_STATUS.PENDING) throw new Error('Not confirmable status.')

      // Collection Order Status change (PENDING => PENDING_RECEIVE)
      collectionOrder = await getRepository(CollectionOrder).save({
        ...foundCollectionOrder,
        status: ORDER_STATUS.PENDING_RECEIVE,
        updater: context.state.user
      })

      return collectionOrder
    })
  }
}
