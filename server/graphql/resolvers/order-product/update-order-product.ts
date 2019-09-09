import { getRepository } from 'typeorm'
import { OrderProduct } from '../../../entities'

export const updateOrderProduct = {
  async updateOrderProduct(_: any, { name, patch }, context: any) {
    const orderProduct = await getRepository(OrderProduct).findOne({
      where: { domain: context.state.domain, name }
    })

    return await getRepository(OrderProduct).save({
      ...orderProduct,
      ...patch,
      updater: context.state.user
    })
  }
}
