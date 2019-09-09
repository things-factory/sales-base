import { getRepository } from 'typeorm'
import { OrderVas } from '../../../entities'

export const createOrderVas = {
  async createOrderVas(_: any, { orderVas }, context: any) {
    return await getRepository(OrderVas).save({
      ...orderVas,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
