import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const updateProductOptionDetail = {
  async updateProductOptionDetail(_, { id, patch }) {
    const repository = getRepository(ProductOptionDetail)

    const productOptionDetail = await repository.findOne({ id })

    return await repository.save({
      ...productOptionDetail,
      ...patch
    })
  }
}
