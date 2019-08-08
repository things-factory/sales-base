import { getRepository } from 'typeorm'
import { Product } from '../../../entities'

export const productResolver = {
  async product(_: any, { name }, context: any) {
    return await getRepository(Product).findOne({
      where: { domain: context.domain, name },
      relations: ['domain', 'bizplace', 'productBatch', 'refTo', 'aliases', 'options', 'creator', 'updater']
    })
  }
}
