import { getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const deleteCollectionOrder = {
  async deleteCollectionOrder(_, { id }) {
    const repository = getRepository(CollectionOrder)

    return await repository.delete(id)
  }
}
