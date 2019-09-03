import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const quotationItemResolver = {
  async quotationItem(_: any, { id }, context: any) {
    return await getRepository(QuotationItem).findOne({ domain: context.state.domain, id })
  }
}
