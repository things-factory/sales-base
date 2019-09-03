import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const updateProductBatch = {
  async updateProductBatch(_: any, { name, patch }, context: any) {
    const repository = getRepository(ProductBatch)
    const productBatch = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...productBatch,
      ...patch,
      updater: context.state.user
    })
  }
}
