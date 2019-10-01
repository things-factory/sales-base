import { getRepository, In } from 'typeorm'
import { VasOrder } from '../../../entities'

export const deleteVasOrders = {
  async deleteVasOrders(_: any, { names }, context: any) {
    await getRepository(VasOrder).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

