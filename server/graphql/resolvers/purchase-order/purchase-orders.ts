import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const purchaseOrdersResolver = {
  async purchaseOrders() {
    const repository = getRepository(PurchaseOrder)

    return await repository.find()
  }
}
