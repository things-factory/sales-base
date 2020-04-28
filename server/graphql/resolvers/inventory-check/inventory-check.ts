import { getRepository } from 'typeorm'
import { InventoryCheck } from '../../../entities'

export const inventoryCheckResolver = {
  async inventoryCheck(_: any, { name }, context: any) {
    const repository = getRepository(InventoryCheck)

    return await getRepository(InventoryCheck).findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

