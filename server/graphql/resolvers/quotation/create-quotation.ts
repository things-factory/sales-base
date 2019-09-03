import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const createQuotation = {
  async createQuotation(_: any, { quotation }, context: any) {
    return await getRepository(Quotation).save({
      domain: context.state.domain,
      ...quotation,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
