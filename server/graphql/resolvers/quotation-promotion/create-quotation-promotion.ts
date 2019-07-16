import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const createQuotationPromotion = {
  async createQuotationPromotion(_: any, { quotationPromotion }, context: any) {
    return await getRepository(QuotationPromotion).save({
      domain: context.domain,
      ...quotationPromotion,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
