import { getRepository } from 'typeorm'
import { InventoryCheck } from '../../../entities'

export const updateInventoryCheck = {
  async updateInventoryCheck(_: any, { name, patch }, context: any) {
    const repository = getRepository(InventoryCheck)
    const inventoryCheck = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...inventoryCheck,
      ...patch,
      updater: context.state.user
    })
  }
}