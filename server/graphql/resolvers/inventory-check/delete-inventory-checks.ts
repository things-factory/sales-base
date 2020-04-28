import { getRepository, In } from 'typeorm'
import { InventoryCheck } from '../../../entities'

export const deleteInventoryChecks = {
  async deleteInventoryChecks(_: any, { names }, context: any) {
    await getRepository(InventoryCheck).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

