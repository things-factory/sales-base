import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const updateQuotation = {
  async updateQuotation(_, { id, patch }) {
    const repository = getRepository(Quotation)

    const quotation = await repository.findOne({ id })

    return await repository.save({
      ...quotation,
      ...patch
    })
  }
}
