import { getRepository, In } from 'typeorm'
import { OrderProduct } from '../../../entities'

export const deleteOrderProducts = {
  async deleteOrderProducts(_: any, { names }, context: any) {
    await getRepository(OrderProduct).delete({
      domain: context.state.domain,
      name: In(names)
    })
    return true
  }
}
