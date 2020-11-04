import { getRepository } from 'typeorm'
import { ReturnOrder } from '../../../entities'

export const returnOrderResolver = {
  async returnOrder(_: any, { name }, context: any) {
    const repository = getRepository(ReturnOrder)

    return await repository.findOne({
      where: { domain: context.state.domain, name }, 
      relations: ['domain', 'creator', 'updater']
    })
  }
}

