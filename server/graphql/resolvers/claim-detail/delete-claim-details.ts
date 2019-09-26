import { getRepository, In } from 'typeorm'
import { ClaimDetail } from '../../../entities'

export const deleteClaimDetails = {
  async deleteClaimDetails(_: any, { names }, context: any) {
    await getRepository(ClaimDetail).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

