import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const createQuotationPromotion = {
  async createQuotationPromotion(_, { quotationPromotion: attrs }) {
    const repository = getRepository(QuotationPromotion)
    const newQuotationPromotion = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newQuotationPromotion)
  }
}
