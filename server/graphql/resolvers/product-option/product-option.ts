import { getRepository } from 'typeorm'
import { Product, ProductOption } from '../../../entities'

export const productOptionResolver = {
  async productOption(_: any, { product, name }, context: any) {
    return await getRepository(ProductOption).findOne({
      where: { domain: context.state.domain, name, product: await getRepository(Product).findOne(product.id) },
      relations: ['domain', 'product', 'productOptionDetails', 'creator', 'updater']
    })
  }
}
