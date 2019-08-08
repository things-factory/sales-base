import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const productBatchResolver = {
  async productBatch(_, { id }, context, info) {
    const repository = getRepository(ProductBatch)

    return await repository.findOne(
      { id }
    )
  }
}
