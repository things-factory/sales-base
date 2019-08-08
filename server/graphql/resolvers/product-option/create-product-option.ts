import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const createProductOption = {
  async createProductOption(_, { productOption: attrs }) {
    const repository = getRepository(ProductOption)
    const newProductOption = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newProductOption)
  }
}
