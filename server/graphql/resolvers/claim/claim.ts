import { getRepository } from 'typeorm'
import { Claim } from '../../../entities'

export const claimResolver = {
  async claim(_: any, { name }, context: any) {
    const repository = getRepository(Claim)

    return await getRepository(Claim).findOne({
      where: { domain: context.state.domain, name, relations: ['domain', 'creator', 'updater']}
    })
  }
}

