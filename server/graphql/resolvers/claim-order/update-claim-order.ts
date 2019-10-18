import { getRepository } from 'typeorm'
import { ClaimOrder } from '../../../entities'

export const updateClaimOrder = {
  async updateClaimOrder(_: any, { name, patch }, context: any) {
    const repository = getRepository(ClaimOrder)
    const claimOrder = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...claimOrder,
      ...patch,
      updater: context.state.user
    })
  }
}