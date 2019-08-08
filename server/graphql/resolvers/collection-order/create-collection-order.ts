import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const createCollectionOrder = {
  async createCollectionOrder(_, { collectionOrder: attrs }) {
    const repository = getRepository(CollectionOrder)
    const newCollectionOrder = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newCollectionOrder)
  }
}
