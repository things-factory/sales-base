import { getRepository } from 'typeorm'
import { OrderInventory } from '../../../entities'

export const deleteOrderInventory = {
  async deleteOrderInventory(_: any, { name }, context: any) {
    await getRepository(OrderInventory).delete({ domain: context.state.domain, name })
    return true
  }
}

