import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const deleteProductOptionDetail = {
  async deleteProductOptionDetail(_, { id }) {
    const repository = getRepository(ProductOptionDetail)

    return await repository.delete(id)
  }
}
