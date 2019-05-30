import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const quotationsResolver = {
  async quotations() {
    const repository = getRepository(Quotation)

    return await repository.find()
  }
}
