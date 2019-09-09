import { getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deleteDeliveryOrder = {
  async deleteDeliveryOrder(_: any, { name }, context: any) {
    await getRepository(DeliveryOrder).delete({ domain: context.state.domain, name })
    return true
  }
}
