import { getRepository } from 'typeorm'
import { Vas } from '../../../entities'

export const vasResolver = {
  async vas(_: any, { name }, context: any) {
    return await getRepository(Vas).findOne({
      where: {
        domain: context.state.domain,
        name
      },
      relations: ['domain', 'creator', 'updater']
    })
  }
}
