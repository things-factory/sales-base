import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const priceListsResolver = {
  async priceLists() {
    const repository = getRepository(PriceList)

    return await repository.find()
  }
}
