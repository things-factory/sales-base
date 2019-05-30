import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const invoicesResolver = {
  async invoices() {
    const repository = getRepository(Invoice)

    return await repository.find()
  }
}
