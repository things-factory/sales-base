import { getRepository } from 'typeorm'
import { Vas } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const updateVas = {
  async updateVas(_: any, { name, patch }, context: any) {
    const vas = await getRepository(Vas).findOne({ domain: context.state.domain, name })

    if (patch.bizplace && patch.bizplace.id) {
      patch.bizplace = await getRepository(Bizplace).findOne(patch.bizplace.id)
    }

    return await getRepository(Vas).save({
      ...vas,
      ...patch,
      updater: context.state.user
    })
  }
}
