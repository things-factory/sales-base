import { getRepository } from 'typeorm'
import { Product } from '../../../entities'

export const deleteProduct = {
  async deleteProduct(_: any, { name }) {
    await getRepository(Product).delete(name)
    return true
  }
}
