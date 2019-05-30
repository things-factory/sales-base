import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const quotationItemsResolver = {
  async quotationItems() {
    const repository = getRepository(QuotationItem)

    return await repository.find()
  }
}
