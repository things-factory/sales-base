import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const updateQuotation = {
  async updateQuotation(_: any, { name, patch }, context: any) {
    const repository = getRepository(Quotation)
    const quotation = await repository.findOne({
      where: { domain: context.domain, name }
    })

    return await repository.save({
      ...quotation,
      ...patch,
      updaterId: context.state.user.id
    })
  }
}
