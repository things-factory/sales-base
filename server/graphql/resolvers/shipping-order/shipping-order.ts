import { getRepository } from 'typeorm'
import { ShippingOrder } from '../../../entities'

export const shippingOrderResolver = {
  async shippingOrder(_, { id }, context, info) {
    const repository = getRepository(ShippingOrder)

    return await repository.findOne({ id })
  }
}
