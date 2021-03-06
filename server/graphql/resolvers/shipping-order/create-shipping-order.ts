import { getRepository } from 'typeorm'
import uuid from 'uuid/v4'
import { ShippingOrder } from '../../../entities'

export const createShippingOrder = {
  async createShippingOrder(_, { shippingOrder: attrs }) {
    const repository = getRepository(ShippingOrder)
    const newShippingOrder = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newShippingOrder)
  }
}
