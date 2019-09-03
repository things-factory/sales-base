import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const createProductOption = {
  async createProductOption(_: any, { productOption }, context: any) {
    return await getRepository(ProductOption).save({
      domain: context.state.domain,
      ...productOption,
      creator: context.state.user,
      updater: context.state.user
    })
  }
}
