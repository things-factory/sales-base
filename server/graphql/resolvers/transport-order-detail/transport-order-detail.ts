import { getRepository } from 'typeorm'
import { TransportOrderDetail } from '../../../entities'

export const transportOrderDetailResolver = {
  async transportOrderDetail(_: any, { name }, context: any) {
    const repository = getRepository(TransportOrderDetail)

    return await getRepository(TransportOrderDetail).findOne({
      where: { domain: context.state.domain, name, relations: ['domain', 'creator', 'updater']}
    })
  }
}

