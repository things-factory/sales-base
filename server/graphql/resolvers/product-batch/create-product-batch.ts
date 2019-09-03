import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const createProductBatch = {
  async createProductBatch(_: any, { productBatch }, context: any) {
    if (productBatch.bizplace && productBatch.bizplace.id) {
      productBatch.bizplace = await getRepository(Bizplace).findOne(productBatch.bizplace.id)
    } else {
      productBatch.bizplace = context.state.bizplaces[0]
    }

    if (productBatch.refTo && productBatch.refTo.id) {
      productBatch.refTo = await getRepository(ProductBatch).findOne(productBatch.refTo.id)
    }

    return await getRepository(ProductBatch).save({
      ...productBatch,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
