import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const deletePurchaseOrder = {
  async deletePurchaseOrder(_, { id }) {
    const repository = getRepository(PurchaseOrder)

    return await repository.delete(id)
  }
}
