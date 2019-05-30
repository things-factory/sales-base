import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const quotationItemResolver = {
  async quotationItem(_, { id }, context, info) {
    const repository = getRepository(QuotationItem)

    return await repository.findOne(
      { id }
    )
  }
}
