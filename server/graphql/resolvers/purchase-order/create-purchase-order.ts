import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const createPurchaseOrder = {
  async createPurchaseOrder(_, { purchaseOrder: attrs }) {
    const repository = getRepository(PurchaseOrder)
    const newPurchaseOrder = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newPurchaseOrder)
  }
}
