import { getRepository } from 'typeorm'
import { Product, ProductOption } from '../../../entities'

export const createProductOption = {
  async createProductOption(_: any, { productOption }, context: any) {
    return await getRepository(ProductOption).save({
      ...productOption,
      product: await getRepository(Product).findOne(productOption.product.id),
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
