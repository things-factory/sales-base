import { getRepository } from 'typeorm'
import { ReleaseGood } from '../../../entities'

export const createReleaseGood = {
  async createReleaseGood(_: any, { releaseGood}, context: any) {
    return await getRepository(ReleaseGood).save({
      ...releaseGood,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

