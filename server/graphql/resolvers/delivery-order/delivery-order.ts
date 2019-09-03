import { getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deliveryOrderResolver = {
  async deliveryOrder(_: any, { name }, context: any) {
    return await getRepository(DeliveryOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['domain', 'customer', 'creator', 'updater']
    })
  }
}
