import { getRepository } from 'typeorm'
import { OrderInventory } from '../../../entities'

export const createOrderInventory = {
  async createOrderInventory(_: any, { orderInventory}, context: any) {
    return await getRepository(OrderInventory).save({
      ...orderInventory,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

