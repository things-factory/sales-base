import { getRepository, getManager } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const confirmArrivalNotice = {
  async confirmArrivalNotice(_: any, { name }, context: any) {
    return await getManager().transaction(async transactionalEntityManager => {

    // 1. gan status change

    // 2. generate new collection order


    return await getRepository(ArrivalNotice).save({
      ...arrivalNotice,
      domain: context.state.domain,
      bizplace: context.state.bizplaces[0],
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
