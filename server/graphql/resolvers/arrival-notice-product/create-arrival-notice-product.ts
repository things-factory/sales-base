import { getRepository } from 'typeorm'
import { ArrivalNoticeProduct } from '../../../entities'

export const createArrivalNoticeProduct = {
  async createArrivalNoticeProduct(_: any, { arrivalNoticeProduct}, context: any) {
    return await getRepository(ArrivalNoticeProduct).save({
      ...arrivalNoticeProduct,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

