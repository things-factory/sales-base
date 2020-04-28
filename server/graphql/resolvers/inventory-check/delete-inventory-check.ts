import { getRepository } from 'typeorm'
import { InventoryCheck } from '../../../entities'

export const deleteInventoryCheck = {
  async deleteInventoryCheck(_: any, { name }, context: any) {
    await getRepository(InventoryCheck).delete({ domain: context.state.domain, name })
    return true
  }
}

