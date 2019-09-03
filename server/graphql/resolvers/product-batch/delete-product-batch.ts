import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const deleteProductBatch = {
  async deleteProductBatch(_: any, { name }) {
    await getRepository(ProductBatch).delete(name)
    return true
  }
}
