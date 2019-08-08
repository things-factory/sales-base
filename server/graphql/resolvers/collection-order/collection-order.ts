import { getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const collectionOrderResolver = {
  async collectionOrder(_, { id }, context, info) {
    const repository = getRepository(CollectionOrder)

    return await repository.findOne(
      { id }
    )
  }
}
