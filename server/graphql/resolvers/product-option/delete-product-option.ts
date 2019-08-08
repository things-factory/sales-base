import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const deleteProductOption = {
  async deleteProductOption(_, { id }) {
    const repository = getRepository(ProductOption)

    return await repository.delete(id)
  }
}
