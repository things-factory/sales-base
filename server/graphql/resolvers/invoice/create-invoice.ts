import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const createInvoice = {
  async createInvoice(_, { invoice: attrs }) {
    const repository = getRepository(Invoice)
    const newInvoice = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newInvoice)
  }
}
