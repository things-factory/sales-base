import { getRepository } from 'typeorm'
import { Vas } from '../../../entities'
import { Bizplace, getUserBizplaces } from '@things-factory/biz-base'

export const createVas = {
  async createVas(_: any, { vas }, context: any) {
    if (vas.bizplace && vas.bizplace.id) {
      vas.bizplace = await getRepository(Bizplace).findOne(vas.bizplace.id)
    } else {
      const userBizplaces = await getUserBizplaces(context)
      vas.bizplace = userBizplaces[0]
    }

    return await getRepository(Vas).save({
      ...vas,
      domain: context.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
