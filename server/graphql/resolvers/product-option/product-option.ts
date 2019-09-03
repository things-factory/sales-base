import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const productOptionResolver = {
  async productOption(_: any, { name }, context: any) {
    return await getRepository(ProductOption).findOne({
      where: { domain: context.state.domain, name },
      relations: ['domain', 'product', 'details', 'creator', 'updater']
    })
  }
}
