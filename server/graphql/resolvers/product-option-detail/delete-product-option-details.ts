import { getRepository, In } from 'typeorm'
import { ProductOptionDetail, ProductOption } from '../../../entities'

export const deleteProductOptionDetails = {
  async deleteProductOptionDetails(_: any, { productOption, names }) {
    await getRepository(ProductOptionDetail).delete({
      name: In(names),
      productOption: await getRepository(ProductOption).findOne(productOption.id)
    })

    return true
  }
}
