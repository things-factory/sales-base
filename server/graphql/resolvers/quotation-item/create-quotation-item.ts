import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const createQuotationItem = {
  async createQuotationItem(_: any, { quotationItem }, context: any) {
    return await getRepository(QuotationItem).save({
      domain: context.domain,
      ...quotationItem,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
