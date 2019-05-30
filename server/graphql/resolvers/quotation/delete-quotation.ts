import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const deleteQuotation = {
  async deleteQuotation(_, { id }) {
    const repository = getRepository(Quotation)

    return await repository.delete(id)
  }
}
