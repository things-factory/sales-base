import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const updateInvoice = {
  async updateInvoice(_, { id, patch }) {
    const repository = getRepository(Invoice)

    const invoice = await repository.findOne({ id })

    return await repository.save({
      ...invoice,
      ...patch
    })
  }
}
