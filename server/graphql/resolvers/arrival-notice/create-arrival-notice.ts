import { getRepository } from 'typeorm'
import { ArrivalNotice } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const createArrivalNotice = {
  async createArrivalNotice(_: any, { arrivalNotice }, context: any) {
    if (arrivalNotice.bizplace && arrivalNotice.bizplace.id) {
      arrivalNotice.bizplace = await getRepository(Bizplace).findOne(arrivalNotice.bizplace.id)
    } else {
      arrivalNotice.bizplace = context.state.bizplaces[0]
    }

    return await getRepository(ArrivalNotice).save({
      ...arrivalNotice,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
