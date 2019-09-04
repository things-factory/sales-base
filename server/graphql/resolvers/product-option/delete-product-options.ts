import { getRepository, In } from 'typeorm'
import { Product, ProductOption } from '../../../entities'

export const deleteProductOptions = {
  async deleteProductOptions(_: any, { product, names }) {
    await getRepository(ProductOption).delete({
      name: In(names),
      product: await getRepository(Product).findOne(product.id)
    })

    return true
  }
}
