import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const updateProductOption = {
  async updateProductOption(_: any, { name, patch }, context: any) {
    const repository = getRepository(ProductOption)
    const productOption = await repository.findOne({
      where: { domain: context.domain, name }
    })

    return await repository.save({
      ...productOption,
      ...patch,
      updaterId: context.state.user.id
    })
  }
}
