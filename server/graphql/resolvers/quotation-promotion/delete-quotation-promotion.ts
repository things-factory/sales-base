import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const deleteQuotationPromotion = {
  async deleteQuotationPromotion(_: any, { name }, context: any) {
    return await getRepository(QuotationPromotion).delete({ domain: context.domain, name })
  }
}
