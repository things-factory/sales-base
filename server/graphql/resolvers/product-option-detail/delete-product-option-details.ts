import { getRepository, In } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const deleteProductOptionDetails = {
  async deleteProductOptionDetails(_: any, { names }) {
    await getRepository(ProductOptionDetail).delete({
      name: In(names)
    })

    return true
  }
}
