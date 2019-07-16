import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const quotationPromotionResolver = {
  async quotationPromotion(_: any, { name }, context: any) {
    return await getRepository(QuotationPromotion).findOne({
      where: { domain: context.domain, name }
    })
  }
}
