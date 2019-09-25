import { getRepository } from 'typeorm'
import { ReleaseGood } from '../../../entities'

export const updateReleaseGood = {
  async updateReleaseGood(_: any, { name, patch }, context: any) {
    const repository = getRepository(ReleaseGood)
    const releaseGood = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...releaseGood,
      ...patch,
      updater: context.state.user
    })
  }
}