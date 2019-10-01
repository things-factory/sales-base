import { getRepository } from 'typeorm'
import { VasOrder } from '../../../entities'

export const updateVasOrder = {
  async updateVasOrder(_: any, { name, patch }, context: any) {
    const repository = getRepository(VasOrder)
    const vasOrder = await repository.findOne({ 
      where: { domain: context.state.domain, name }
    })

    return await repository.save({
      ...vasOrder,
      ...patch,
      updater: context.state.user
    })
  }
}