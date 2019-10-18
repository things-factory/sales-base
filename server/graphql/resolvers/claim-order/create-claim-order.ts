import { getRepository } from 'typeorm'
import { ClaimOrder } from '../../../entities'

export const createClaimOrder = {
  async createClaimOrder(_: any, { claimOrder}, context: any) {
    return await getRepository(ClaimOrder).save({
      ...claimOrder,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

