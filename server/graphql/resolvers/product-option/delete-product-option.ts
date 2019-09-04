import { getRepository } from 'typeorm'
import { Product, ProductOption } from '../../../entities'

export const deleteProductOption = {
  async deleteProductOption(_: any, { product, name }) {
    await getRepository(ProductOption).delete({
      product: await getRepository(Product).findOne(product.id),
      name
    })
    return true
  }
}
