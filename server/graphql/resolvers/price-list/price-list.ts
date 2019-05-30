import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const priceListResolver = {
  async priceList(_, { id }, context, info) {
    const repository = getRepository(PriceList)

    return await repository.findOne(
      { id }
    )
  }
}
