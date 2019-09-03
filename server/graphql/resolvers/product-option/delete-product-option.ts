import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const deleteProductOption = {
  async deleteProductOption(_: any, { name }) {
    await getRepository(ProductOption).delete(name)
    return true
  }
}
