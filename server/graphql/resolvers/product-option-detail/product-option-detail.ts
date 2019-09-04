import { getRepository } from 'typeorm'
import { ProductOption, ProductOptionDetail } from '../../../entities'

export const productOptionDetailResolver = {
  async productOptionDetail(_: any, { productOption, name }, context: any) {
    return await getRepository(ProductOptionDetail).findOne({
      where: {
        domain: context.state.domain,
        name,
        productOption: await getRepository(ProductOption).findOne(productOption.id)
      },
      relations: ['domain', 'productOption', 'creator', 'updater']
    })
  }
}
