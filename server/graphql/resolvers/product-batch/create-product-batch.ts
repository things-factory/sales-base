import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const createProductBatch = {
  async createProductBatch(_: any, { productBatch }, context: any) {
    return await getRepository(ProductBatch).save({
      domain: context.domain,
      ...productBatch,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
