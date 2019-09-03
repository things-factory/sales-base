import { Bizplace } from '@things-factory/biz-base'
import { getRepository } from 'typeorm'
import { Product } from '../../../entities'

export const createProduct = {
  async createProduct(_: any, { product }, context: any) {
    if (product.bizplace && product.bizplace.id) {
      product.bizplace = await getRepository(Bizplace).findOne(product.bizplace.id)
    } else {
      product.bizplace = context.state.bizplaces[0]
    }

    return await getRepository(Product).save({
      ...product,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
