import { getRepository } from 'typeorm'
import { Product } from '../../../entities'

export const updateProduct = {
  async updateProduct(_: any, { name, patch }, context: any) {
    const repository = getRepository(Product)
    const product = await repository.findOne({ domain: context.domain, name })

    return await repository.save({
      ...product,
      ...patch,
      updaterId: context.state.user.id
    })
  }
}
