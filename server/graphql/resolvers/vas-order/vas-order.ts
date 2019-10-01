import { getRepository } from 'typeorm'
import { VasOrder } from '../../../entities'

export const vasOrderResolver = {
  async vasOrder(_: any, { name }, context: any) {
    const repository = getRepository(VasOrder)

    return await getRepository(VasOrder).findOne({
      where: { domain: context.state.domain, name, relations: ['domain', 'creator', 'updater']}
    })
  }
}

