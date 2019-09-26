import { getRepository } from 'typeorm'
import { ClaimDetail } from '../../../entities'

export const deleteClaimDetail = {
  async deleteClaimDetail(_: any, { name }, context: any) {
    await getRepository(ClaimDetail).delete({ domain: context.state.domain, name })
    return true
  }
}

