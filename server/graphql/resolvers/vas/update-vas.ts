import { getRepository } from 'typeorm'
import { Vas } from '../../../entities'

export const updateVas = {
  async updateVas(_: any, { name, patch }, context: any) {
    const vas = await getRepository(Vas).findOne({ domain: context.state.domain, name })

    return await getRepository(Vas).save({
      ...vas,
      ...patch,
      updater: context.state.user
    })
  }
}
