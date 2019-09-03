import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const createQuotationPromotion = {
  async createQuotationPromotion(_: any, { quotationPromotion }, context: any) {
    return await getRepository(QuotationPromotion).save({
      domain: context.state.domain,
      ...quotationPromotion,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
