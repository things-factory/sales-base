import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const invoiceResolver = {
  async invoice(_, { id }, context, info) {
    const repository = getRepository(Invoice)

    return await repository.findOne(
      { id }
    )
  }
}
