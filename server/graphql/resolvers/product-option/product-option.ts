import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const productOptionResolver = {
  async productOption(_, { id }, context, info) {
    const repository = getRepository(ProductOption)

    return await repository.findOne(
      { id }
    )
  }
}
