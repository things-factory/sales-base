import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const updateQuotationItem = {
  async updateQuotationItem(_, { id, patch }) {
    const repository = getRepository(QuotationItem)

    const quotationItem = await repository.findOne({ id })

    return await repository.save({
      ...quotationItem,
      ...patch
    })
  }
}
