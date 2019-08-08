import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const createProductOptionDetail = {
  async createProductOptionDetail(_: any, { productOptionDetail }, context: any) {
    return await getRepository(ProductOptionDetail).save({
      domain: context.domain,
      ...productOptionDetail,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
