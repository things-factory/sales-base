import { getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deliveryOrderResolver = {
  async deliverOrder(_: any, { name }, context: any) {
    return await getRepository(DeliveryOrder).findOne({
      where: { domain: context.domain, name },
      relations: ['domain', 'creator', 'updater']
    })
  }
}
