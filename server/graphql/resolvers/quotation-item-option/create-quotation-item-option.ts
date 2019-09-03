import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const createQuotationItemOption = {
  async createQuotationItemOption(_: any, { quotationItemOption }, context: any) {
    return await getRepository(QuotationItemOption).save({
      domain: context.state.domain,
      ...quotationItemOption,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
