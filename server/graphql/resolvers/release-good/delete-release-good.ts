import { getRepository } from 'typeorm'
import { ReleaseGood } from '../../../entities'

export const deleteReleaseGood = {
  async deleteReleaseGood(_: any, { name }, context: any) {
    await getRepository(ReleaseGood).delete({ domain: context.state.domain, name })
    return true
  }
}

