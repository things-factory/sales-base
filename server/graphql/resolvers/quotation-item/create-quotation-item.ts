import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const createQuotationItem = {
  async createQuotationItem(_, { quotationItem: attrs }) {
    const repository = getRepository(QuotationItem)
    const newQuotationItem = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newQuotationItem)
  }
}
