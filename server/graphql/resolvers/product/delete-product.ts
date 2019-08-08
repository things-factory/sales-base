import { getRepository } from 'typeorm'
import { Product } from '../../../entities'

export const deleteProduct = {
  async deleteProduct(_: any, { name }, context: any) {
    return await getRepository(Product).delete({ domain: context.domain, name })
  }
}
