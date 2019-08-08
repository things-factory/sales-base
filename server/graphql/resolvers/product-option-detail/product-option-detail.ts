import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const productOptionDetailResolver = {
  async productOptionDetail(_: any, { name }, context: any) {
    return await getRepository(ProductOptionDetail).findOne({
      where: { domain: context.domain, name },
      relations: ['domain', 'productOption']
    })
  }
}
