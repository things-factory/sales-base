import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const updateProductBatch = {
  async updateProductBatch(_, { id, patch }) {
    const repository = getRepository(ProductBatch)

    const productBatch = await repository.findOne({ id })

    return await repository.save({
      ...productBatch,
      ...patch
    })
  }
}
