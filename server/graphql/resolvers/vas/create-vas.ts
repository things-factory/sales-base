import { Bizplace } from '@things-factory/biz-base'
import { getRepository } from 'typeorm'
import { Vas } from '../../../entities'

export const createVas = {
  async createVas(_: any, { vas }, context: any) {
    if (vas.bizplace && vas.bizplace.id) {
      vas.bizplace = await getRepository(Bizplace).findOne(vas.bizplace.id)
    } else {
      vas.bizplace = context.stats.bizplaces[0]
    }

    return await getRepository(Vas).save({
      ...vas,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
