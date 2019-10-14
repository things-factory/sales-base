import { getRepository } from 'typeorm'
import { TransportOrderDetail } from '../../../entities'

export const updateTransportOrderDetail = {
  async updateTransportOrderDetail(_: any, { name, patch }, context: any) {
    const repository = getRepository(TransportOrderDetail)
    const transportOrderDetail = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...transportOrderDetail,
      ...patch,
      updater: context.state.user
    })
  }
}