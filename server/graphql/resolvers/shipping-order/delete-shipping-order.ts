import { getRepository } from 'typeorm'
import { ShippingOrder } from '../../../entities'

export const deleteShippingOrder = {
  async deleteShippingOrder(_, { id }) {
    const repository = getRepository(ShippingOrder)

    return await repository.delete(id)
  }
}
