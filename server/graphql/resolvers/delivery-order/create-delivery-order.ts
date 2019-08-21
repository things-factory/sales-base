import { getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const createDeliveryOrder = {
  async createDeliveryOrder(_: any, { deliveryOrder }, context: any) {
    return await getRepository(DeliveryOrder).save({
      domain: context.domain,
      ...deliveryOrder,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
