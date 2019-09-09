import { getRepository } from 'typeorm'
import { OrderProduct } from '../../../entities'

export const orderProductResolver = {
  async orderProduct(_: any, { name }, context: any) {
    return await getRepository(OrderProduct).findOne({
      where: {
        domain: context.state.domain,
        name,
        relations: ['domain', 'arrivalNotice', 'product', 'creator', 'updater']
      }
    })
  }
}
