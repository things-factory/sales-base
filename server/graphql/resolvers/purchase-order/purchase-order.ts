import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const purchaseOrderResolver = {
  async purchaseOrder(_: any, { name }, context: any) {
    return await getRepository(PurchaseOrder).findOne({
      where: { domain: context.domain, name },
      relations: ['domain', 'quotation', 'creator', 'updater']
    })
  }
}
