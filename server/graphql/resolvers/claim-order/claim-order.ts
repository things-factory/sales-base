import { getRepository } from 'typeorm'
import { ClaimOrder } from '../../../entities'

export const claimOrderResolver = {
  async claimOrder(_: any, { name }, context: any) {
    const repository = getRepository(ClaimOrder)

    return await getRepository(ClaimOrder).findOne({
      where: { domain: context.state.domain, name, relations: ['domain', 'creator', 'updater']}
    })
  }
}

