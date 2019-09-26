import { getRepository } from 'typeorm'
import { ClaimDetail } from '../../../entities'

export const claimDetailResolver = {
  async claimDetail(_: any, { name }, context: any) {
    const repository = getRepository(ClaimDetail)

    return await getRepository(ClaimDetail).findOne({
      where: { domain: context.state.domain, name, relations: ['domain', 'creator', 'updater']}
    })
  }
}

