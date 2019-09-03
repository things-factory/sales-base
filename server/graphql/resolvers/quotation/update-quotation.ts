import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const updateQuotation = {
  async updateQuotation(_: any, { name, patch }, context: any) {
    const repository = getRepository(Quotation)
    const quotation = await repository.findOne({
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...quotation,
      ...patch,
      updater: context.state.user
    })
  }
}
