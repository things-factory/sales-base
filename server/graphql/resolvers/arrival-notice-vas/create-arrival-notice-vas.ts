import { getRepository } from 'typeorm'
import { ArrivalNoticeVas } from '../../../entities'

export const createArrivalNoticeVas = {
  async createArrivalNoticeVas(_: any, { arrivalNoticeVas}, context: any) {
    return await getRepository(ArrivalNoticeVas).save({
      ...arrivalNoticeVas,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

