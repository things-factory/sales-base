import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const updatePurchaseOrder = {
  async updatePurchaseOrder(_, { id, patch }) {
    const repository = getRepository(PurchaseOrder)

    const purchaseOrder = await repository.findOne({ id })

    return await repository.save({
      ...purchaseOrder,
      ...patch
    })
  }
}
