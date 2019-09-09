import { getRepository } from 'typeorm'
import { OrderVas } from '../../../entities'

export const updateOrderVas = {
  async updateOrderVas(_: any, { name, patch }, context: any) {
    const orderVas = await getRepository(OrderVas).findOne({
      where: { domain: context.state.domain, name }
    })

    return await getRepository(OrderVas).save({
      ...orderVas,
      ...patch,
      updater: context.state.user
    })
  }
}
