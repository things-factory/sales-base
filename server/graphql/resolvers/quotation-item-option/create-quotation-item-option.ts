import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const createQuotationItemOption = {
  async createQuotationItemOption(_: any, { quotationItemOption }, context: any) {
    return await getRepository(QuotationItemOption).save({
      domain: context.domain,
      ...quotationItemOption,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
