import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const quotationPromotionsResolver = {
  async quotationPromotions() {
    const repository = getRepository(QuotationPromotion)

    return await repository.find()
  }
}
