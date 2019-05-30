import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const updateQuotationPromotion = {
  async updateQuotationPromotion(_, { id, patch }) {
    const repository = getRepository(QuotationPromotion)

    const quotationPromotion = await repository.findOne({ id })

    return await repository.save({
      ...quotationPromotion,
      ...patch
    })
  }
}
