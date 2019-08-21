import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const updatePurchaseOrder = {
  async updatePurchaseOrder(_: any, { name, patch }, context: any) {
    const repository = getRepository(PurchaseOrder)
    const purchaseOrder = await repository.findOne({
      where: { domain: context.domain, name }
    })

    return await repository.save({
      ...purchaseOrder,
      ...patch,
      updater: context.state.user
    })
  }
}
