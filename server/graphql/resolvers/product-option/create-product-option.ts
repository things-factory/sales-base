import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const createProductOption = {
  async createProductOption(_: any, { productOption }, context: any) {
    return await getRepository(ProductOption).save({
      domain: context.domain,
      ...productOption,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
