import { getRepository } from 'typeorm'
import { ClaimOrder } from '../../../entities'

export const deleteClaimOrder = {
  async deleteClaimOrder(_: any, { name }, context: any) {
    await getRepository(ClaimOrder).delete({ domain: context.state.domain, name })
    return true
  }
}

