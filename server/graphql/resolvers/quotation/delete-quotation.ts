import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const deleteQuotation = {
  async deleteQuotation(_: any, { name }, context: any) {
    return await getRepository(Quotation).delete({ domain: context.state.domain, name })
  }
}
