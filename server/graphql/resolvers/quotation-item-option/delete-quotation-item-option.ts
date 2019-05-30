import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const deleteQuotationItemOption = {
  async deleteQuotationItemOption(_, { id }) {
    const repository = getRepository(QuotationItemOption)

    return await repository.delete(id)
  }
}
