import { getRepository } from 'typeorm'
import { ReturnOrder } from '../../../entities'

export const createReturnOrder = {
  async createReturnOrder(_: any, { returnOrder }, context: any) {
    return await getRepository(ReturnOrder).save({
      ...returnOrder,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
