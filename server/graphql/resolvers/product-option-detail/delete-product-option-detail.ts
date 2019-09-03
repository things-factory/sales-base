import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const deleteProductOptionDetail = {
  async deleteProductOptionDetail(_: any, { name }) {
    await getRepository(ProductOptionDetail).delete(name)
    return true
  }
}
