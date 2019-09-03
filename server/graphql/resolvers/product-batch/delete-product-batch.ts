import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const deleteProductBatch = {
  async deleteProductBatch(_: any, { name }, context: any) {
    return await getRepository(ProductBatch).delete({ domain: context.state.domain, name })
  }
}
