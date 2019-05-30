import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const deleteQuotationItem = {
  async deleteQuotationItem(_, { id }) {
    const repository = getRepository(QuotationItem)

    return await repository.delete(id)
  }
}
