import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const createQuotationItem = {
  async createQuotationItem(_: any, { quotationItem }, context: any) {
    return await getRepository(QuotationItem).save({
      domain: context.domain,
      ...quotationItem,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
