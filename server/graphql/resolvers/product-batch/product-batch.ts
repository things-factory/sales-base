import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const productBatchResolver = {
  async productBatch(_: any, { name }, context: any) {
    const repository = getRepository(ProductBatch).findOne({
      where: { domain: context.domain, name },
      relations: ['domain', 'product', 'lots', 'creator', 'updater']
    })
  }
}
