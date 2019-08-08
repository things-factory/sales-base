import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const createProductOptionDetail = {
  async createProductOptionDetail(_, { productOptionDetail: attrs }) {
    const repository = getRepository(ProductOptionDetail)
    const newProductOptionDetail = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newProductOptionDetail)
  }
}
