import { getRepository } from 'typeorm'
import { OrderInventory } from '../../../entities'

export const updateOrderInventory = {
  async updateOrderInventory(_: any, { name, patch }, context: any) {
    const repository = getRepository(OrderInventory)
    const orderInventory = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...orderInventory,
      ...patch,
      updater: context.state.user
    })
  }
}