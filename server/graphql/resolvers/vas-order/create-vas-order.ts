import { getRepository } from 'typeorm'
import { VasOrder } from '../../../entities'

export const createVasOrder = {
  async createVasOrder(_: any, { vasOrder}, context: any) {
    return await getRepository(VasOrder).save({
      ...vasOrder,
      domain: context.state.domain,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}

