import { getRepository } from 'typeorm'
import { TransportOrderDetail } from '../../../entities'

export const createTransportOrderDetail = {
  async createTransportOrderDetail(_: any, { transportOrderDetail}, context: any) {
    return await getRepository(TransportOrderDetail).save({
      ...transportOrderDetail,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

