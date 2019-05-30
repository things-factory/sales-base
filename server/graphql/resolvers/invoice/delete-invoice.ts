import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const deleteInvoice = {
  async deleteInvoice(_, { id }) {
    const repository = getRepository(Invoice)

    return await repository.delete(id)
  }
}
