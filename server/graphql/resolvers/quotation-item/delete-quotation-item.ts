import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const deleteQuotationItem = {
  async deleteQuotationItem(_: any, { id }, context: any) {
    return await getRepository(QuotationItem).delete({ domain: context.domain, id })
  }
}
