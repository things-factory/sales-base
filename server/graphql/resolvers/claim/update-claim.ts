import { getRepository } from 'typeorm'
import { Claim } from '../../../entities'

export const updateClaim = {
  async updateClaim(_: any, { name, patch }, context: any) {
    const repository = getRepository(Claim)
    const claim = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...claim,
      ...patch,
      updater: context.state.user
    })
  }
}