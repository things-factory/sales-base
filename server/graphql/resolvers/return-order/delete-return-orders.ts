import { getRepository, In } from 'typeorm'
import { ReturnOrder } from '../../../entities'

export const deleteReturnOrders = {
  async deleteReturnOrders(_: any, { names }, context: any) {
    await getRepository(ReturnOrder).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

