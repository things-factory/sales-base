import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const deleteQuotationItemOption = {
  async deleteQuotationItemOption(_: any, { name }, context: any) {
    return await getRepository(QuotationItemOption).delete({ domain: context.domain, name })
  }
}
