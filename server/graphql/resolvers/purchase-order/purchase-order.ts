import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const purchaseOrderResolver = {
  async purchaseOrder(_, { id }, context, info) {
    const repository = getRepository(PurchaseOrder)

    return await repository.findOne(
      { id }
    )
  }
}
