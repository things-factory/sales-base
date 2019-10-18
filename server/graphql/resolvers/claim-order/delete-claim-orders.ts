import { getRepository, In } from 'typeorm'
import { ClaimOrder } from '../../../entities'

export const deleteClaimOrders = {
  async deleteClaimOrders(_: any, { names }, context: any) {
    await getRepository(ClaimOrder).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

