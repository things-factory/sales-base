import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const deleteQuotationPromotion = {
  async deleteQuotationPromotion(_, { id }) {
    const repository = getRepository(QuotationPromotion)

    return await repository.delete(id)
  }
}
