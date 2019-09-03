import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const deleteProductOptionDetail = {
  async deleteProductOptionDetail(_: any, { name }, context: any) {
    return await getRepository(ProductOptionDetail).delete({ domain: context.state.domain, name })
  }
}
