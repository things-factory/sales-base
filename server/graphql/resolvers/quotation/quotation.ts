import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const quotationResolver = {
  async quotation(_: any, { name }, context: any) {
    return await getRepository(Quotation).findOne({
      where: { domain: context.state.domain, name },
      relations: ['domain', 'customer', 'items', 'creator', 'updater']
    })
  }
}
