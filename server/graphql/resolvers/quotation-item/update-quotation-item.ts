import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const updateQuotationItem = {
  async updateQuotationItem(_: any, { id, patch }, context: any) {
    const repository = getRepository(QuotationItem)
    const quotationItem = await repository.findOne({ domain: context.state.domain, id })

    return await repository.save({
      ...quotationItem,
      ...patch,
      updater: context.state.user
    })
  }
}
