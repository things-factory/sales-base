import { getRepository } from 'typeorm'
import { ArrivalNotice } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const updateArrivalNotice = {
  async updateArrivalNotice(_: any, { name, patch }, context: any) {
    const arrivalNotice = await getRepository(ArrivalNotice).findOne({ domain: context.state.domain, name })

    if (patch.bizplace && patch.bizplace.id) {
      patch.bizplace = await getRepository(Bizplace).findOne(patch.bizplace.id)
    }

    return await getRepository(ArrivalNotice).save({
      ...arrivalNotice,
      ...patch,
      updater: context.state.user
    })
  }
}
