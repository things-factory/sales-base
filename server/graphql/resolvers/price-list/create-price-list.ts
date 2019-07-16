import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const createPriceList = {
  async createPriceList(_: any, { priceList }, context: any) {
    return await getRepository(PriceList).save({
      domain: context.domain,
      ...priceList,
      creatorId: context.state.user.id,
      updaterId: context.state.user.id
    })
  }
}
