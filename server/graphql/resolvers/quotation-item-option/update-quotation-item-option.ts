import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const updateQuotationItemOption = {
  async updateQuotationItemOption(_, { id, patch }) {
    const repository = getRepository(QuotationItemOption)

    const quotationItemOption = await repository.findOne({ id })

    return await repository.save({
      ...quotationItemOption,
      ...patch
    })
  }
}
