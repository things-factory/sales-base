import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const invoiceResolver = {
  async invoice(_: any, { name }, context: any) {
    return await getRepository(Invoice).findOne({
      where: { domain: context.domain, name },
      relations: ['domain', 'customer', 'purchaseOrder', 'creator', 'updater']
    })
  }
}
