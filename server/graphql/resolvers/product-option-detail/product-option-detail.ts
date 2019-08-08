import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const productOptionDetailResolver = {
  async productOptionDetail(_, { id }, context, info) {
    const repository = getRepository(ProductOptionDetail)

    return await repository.findOne(
      { id }
    )
  }
}
