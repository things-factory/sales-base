import { getRepository } from 'typeorm'
import { Product } from '../../../entities'

export const createProduct = {
  async createProduct(_: any, { product }, context: any) {
    return await getRepository(Product).save({
      ...product,
      domain: context.state.domain,
      bizplace: context.state.bizplaces[0],
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
