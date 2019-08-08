import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const deleteProductBatch = {
  async deleteProductBatch(_, { id }) {
    const repository = getRepository(ProductBatch)

    return await repository.delete(id)
  }
}
