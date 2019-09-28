import { getRepository } from 'typeorm'
import { ShippingOrder } from '../../../entities'

export const deleteShippingOrder = {
  async deleteShippingOrder(_: any, { name }, context: any) {
    await getRepository(ShippingOrder).delete({ domain: context.state.domain, name })
    return true
  }
}
