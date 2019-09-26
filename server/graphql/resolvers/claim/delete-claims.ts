import { getRepository, In } from 'typeorm'
import { Claim } from '../../../entities'

export const deleteClaims = {
  async deleteClaims(_: any, { names }, context: any) {
    await getRepository(Claim).delete({ 
        domain: context.state.domain,
        name: In(names)
    })
    return true
  }
}

