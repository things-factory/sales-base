import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const createProductBatch = {
  async createProductBatch(_, { productBatch: attrs }) {
    const repository = getRepository(ProductBatch)
    const newProductBatch = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newProductBatch)
  }
}
