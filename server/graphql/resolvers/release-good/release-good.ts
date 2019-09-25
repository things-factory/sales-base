import { getRepository } from 'typeorm'
import { ReleaseGood } from '../../../entities'

export const releaseGoodResolver = {
  async releaseGood(_: any, { name }, context: any) {
    const repository = getRepository(ReleaseGood)

    return await getRepository(ReleaseGood).findOne({
      where: { domain: context.state.domain, name, relations: ['domain', 'creator', 'updater']}
    })
  }
}

