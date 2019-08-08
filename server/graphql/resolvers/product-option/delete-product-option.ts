import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const deleteProductOption = {
  async deleteProductOption(_: any, { name }, context: any) {
    return await getRepository(ProductOption).delete({ domain: context.domain, name })
  }
}
