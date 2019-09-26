import { getRepository } from 'typeorm'
import { Claim } from '../../../entities'

export const deleteClaim = {
  async deleteClaim(_: any, { name }, context: any) {
    await getRepository(Claim).delete({ domain: context.state.domain, name })
    return true
  }
}

