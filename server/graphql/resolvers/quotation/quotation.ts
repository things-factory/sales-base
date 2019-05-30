import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const quotationResolver = {
  async quotation(_, { id }, context, info) {
    const repository = getRepository(Quotation)

    return await repository.findOne(
      { id }
    )
  }
}
