import { getRepository } from 'typeorm'
import { OrderInventory } from '../../../entities'

export const orderInventoryResolver = {
  async orderInventory(_: any, { name }, context: any) {
    return await getRepository(OrderInventory).findOne({
      where: {
        domain: context.state.domain,
        name
      },
      relations: ['domain', 'releaseGood', 'vasOrder', 'shippingOrder', 'inventory', 'creator', 'updater']
    })
  }
}
