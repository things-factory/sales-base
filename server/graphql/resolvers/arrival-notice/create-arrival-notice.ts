import { getRepository } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const createArrivalNotice = {
  async createArrivalNotice(_: any, { arrivalNotice }, context: any) {
    return await getRepository(ArrivalNotice).save({
      ...arrivalNotice,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
