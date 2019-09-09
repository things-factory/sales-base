import { getRepository } from 'typeorm'
import { OrderProduct } from '../../../entities'

export const createOrderProduct = {
  async createOrderProduct(_: any, { orderProduct }, context: any) {
    return await getRepository(OrderProduct).save({
      ...orderProduct,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
