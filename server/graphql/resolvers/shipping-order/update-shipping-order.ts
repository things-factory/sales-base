import { getRepository } from 'typeorm'
import { ShippingOrder } from '../../../entities'

export const updateShippingOrder = {
  async updateShippingOrder(_, { id, patch }) {
    const repository = getRepository(ShippingOrder)

    const shippingOrder = await repository.findOne({ id })

    return await repository.save({
      ...shippingOrder,
      ...patch
    })
  }
}
