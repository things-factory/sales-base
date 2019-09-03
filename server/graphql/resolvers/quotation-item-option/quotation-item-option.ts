import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const quotationItemOptionResolver = {
  async quotationItemOption(_: any, { name }, context: any) {
    return await getRepository(QuotationItemOption).findOne({
      where: { domain: context.state.domain, name },
      relations: ['domain', 'quotationItem', 'creator', 'updater']
    })
  }
}
