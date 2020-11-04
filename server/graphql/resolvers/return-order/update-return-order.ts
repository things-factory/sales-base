import { getRepository } from 'typeorm'
import { ReturnOrder } from '../../../entities'

export const updateReturnOrder = {
  async updateReturnOrder(_: any, { name, patch }, context: any) {
    const repository = getRepository(ReturnOrder)
    const returnOrder = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...returnOrder,
      ...patch,
      updater: context.state.user
    })
  }
}