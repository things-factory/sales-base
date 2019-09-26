import { getRepository } from 'typeorm'
import { ClaimDetail } from '../../../entities'

export const createClaimDetail = {
  async createClaimDetail(_: any, { claimDetail}, context: any) {
    return await getRepository(ClaimDetail).save({
      ...claimDetail,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

