import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const quotationItemOptionsResolver = {
  async quotationItemOptions() {
    const repository = getRepository(QuotationItemOption)

    return await repository.find()
  }
}
