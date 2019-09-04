import { getRepository } from 'typeorm'
import { ProductOption, ProductOptionDetail } from '../../../entities'

export const deleteProductOptionDetail = {
  async deleteProductOptionDetail(_: any, { productOption, name }) {
    await getRepository(ProductOptionDetail).delete({
      name,
      productOption: await getRepository(ProductOption).findOne(productOption.id)
    })
    return true
  }
}
