import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const quotationItemOptionResolver = {
  async quotationItemOption(_, { id }, context, info) {
    const repository = getRepository(QuotationItemOption)

    return await repository.findOne(
      { id }
    )
  }
}
