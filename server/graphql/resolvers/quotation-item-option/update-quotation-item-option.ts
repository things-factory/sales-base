import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const updateQuotationItemOption = {
  async updateQuotationItemOption(_: any, { name, patch }, context: any) {
    const repository = getRepository(QuotationItemOption)
    const quotationItemOption = await repository.findOne({ domain: context.domain, name })

    return await repository.save({
      ...quotationItemOption,
      ...patch,
      updater: context.state.user
    })
  }
}
