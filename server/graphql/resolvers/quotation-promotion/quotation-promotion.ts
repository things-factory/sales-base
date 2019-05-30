import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const quotationPromotionResolver = {
  async quotationPromotion(_, { id }, context, info) {
    const repository = getRepository(QuotationPromotion)

    return await repository.findOne(
      { id }
    )
  }
}
