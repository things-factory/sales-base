import { getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const updateCollectionOrder = {
  async updateCollectionOrder(_, { id, patch }) {
    const repository = getRepository(CollectionOrder)

    const collectionOrder = await repository.findOne({ id })

    return await repository.save({
      ...collectionOrder,
      ...patch
    })
  }
}
