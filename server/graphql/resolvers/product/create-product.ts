import { getRepository } from 'typeorm'
import { Product } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const createProduct = {
  async createProduct(_: any, { product }, context: any) {
    return await getRepository(Product).save({
      domain: context.domain,
      ...product,
      bizplace: await getRepository(Bizplace).findOne({ where: { name: product.bizplace } }),
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
