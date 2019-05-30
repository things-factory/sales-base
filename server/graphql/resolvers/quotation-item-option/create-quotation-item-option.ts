import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const createQuotationItemOption = {
  async createQuotationItemOption(_, { quotationItemOption: attrs }) {
    const repository = getRepository(QuotationItemOption)
    const newQuotationItemOption = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newQuotationItemOption)
  }
}
