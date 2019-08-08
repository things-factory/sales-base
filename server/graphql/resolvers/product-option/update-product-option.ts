import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const updateProductOption = {
  async updateProductOption(_, { id, patch }) {
    const repository = getRepository(ProductOption)

    const productOption = await repository.findOne({ id })

    return await repository.save({
      ...productOption,
      ...patch
    })
  }
}
