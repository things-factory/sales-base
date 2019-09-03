import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const createProductOptionDetail = {
  async createProductOptionDetail(_: any, { productOptionDetail }, context: any) {
    return await getRepository(ProductOptionDetail).save({
      domain: context.state.domain,
      ...productOptionDetail,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
