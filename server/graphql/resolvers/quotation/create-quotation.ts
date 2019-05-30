import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const createQuotation = {
  async createQuotation(_, { quotation: attrs }) {
    const repository = getRepository(Quotation)
    const newQuotation = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newQuotation)
  }
}
