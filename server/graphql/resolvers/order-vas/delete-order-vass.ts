import { getRepository, In } from 'typeorm'
import { OrderVas } from '../../../entities'

export const deleteOrderVass = {
  async deleteOrderVass(_: any, { names }, context: any) {
    await getRepository(OrderVas).delete({
      domain: context.state.domain,
      name: In(names)
    })
    return true
  }
}
