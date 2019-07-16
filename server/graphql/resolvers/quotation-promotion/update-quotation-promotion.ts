import { getRepository } from 'typeorm'
import { QuotationPromotion } from '../../../entities'

export const updateQuotationPromotion = {
  async updateQuotationPromotion(_: any, { name, patch }, context: any) {
    const repository = getRepository(QuotationPromotion)
    const quotationPromotion = await repository.findOne({ domain: context.domain, name })

    return await repository.save({
      ...quotationPromotion,
      ...patch,
      updaterId: context.state.user.id
    })
  }
}
