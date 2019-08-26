import { getRepository } from 'typeorm'
import { Product } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const createProduct = {
  async createProduct(_: any, { product }, context: any) {
    if (product.bizplace && product.bizplace.id) {
      product.bizplace = await getRepository(Bizplace).findOne(product.bizplace.id)
    }

    return await getRepository(Product).save({
      ...product,
      domain: context.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
