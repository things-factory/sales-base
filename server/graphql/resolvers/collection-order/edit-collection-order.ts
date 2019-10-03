import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { CollectionOrder } from '../../../entities'

export const editCollectionOrder = {
  async editCollectionOrder(_: any, { name, collectionOrder }, context: any) {
    const foundCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['creator', 'updater']
    })

    try {
      if (!foundCollectionOrder) throw new Error(`Collection order doesn't exists.`)
      if (foundCollectionOrder.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      return await getManager().transaction(async () => {
        // 1. update collection order
        const updatedCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).save({
          ...foundCollectionOrder,
          ...collectionOrder.collectionOrder,
          updater: context.state.user
        })

        return updatedCollectionOrder
      })
    } catch (e) {
      throw e
    }
  }
}
