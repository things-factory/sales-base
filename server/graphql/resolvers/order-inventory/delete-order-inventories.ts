import { getRepository, In } from 'typeorm'
import { OrderInventory } from '../../../entities'

export const deleteOrderInventories = {
  async deleteOrderInventories(_: any, { names }, context: any) {
    await getRepository(OrderInventory).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

