import { getRepository } from 'typeorm'
import { InventoryCheck } from '../../../entities'

export const createInventoryCheck = {
  async createInventoryCheck(_: any, { inventoryCheck}, context: any) {
    return await getRepository(InventoryCheck).save({
      ...inventoryCheck,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

