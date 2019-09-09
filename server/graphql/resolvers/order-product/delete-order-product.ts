import { getRepository } from 'typeorm'
import { OrderProduct } from '../../../entities'

export const deleteOrderProduct = {
  async deleteOrderProduct(_: any, { name }, context: any) {
    await getRepository(OrderProduct).delete({ domain: context.state.domain, name })
    return true
  }
}
