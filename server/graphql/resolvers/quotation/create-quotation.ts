import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const createQuotation = {
  async createQuotation(_: any, { quotation }, context: any) {
    return await getRepository(Quotation).save({
      domain: context.domain,
      ...quotation,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
