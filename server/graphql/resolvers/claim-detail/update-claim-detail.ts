import { getRepository } from 'typeorm'
import { ClaimDetail } from '../../../entities'

export const updateClaimDetail = {
  async updateClaimDetail(_: any, { name, patch }, context: any) {
    const repository = getRepository(ClaimDetail)
    const claimDetail = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...claimDetail,
      ...patch,
      updater: context.state.user
    })
  }
}