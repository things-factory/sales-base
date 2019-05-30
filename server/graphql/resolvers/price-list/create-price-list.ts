import uuid from 'uuid/v4'

import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const createPriceList = {
  async createPriceList(_, { priceList: attrs }) {
    const repository = getRepository(PriceList)
    const newPriceList = {
      id: uuid(),
      ...attrs
    }

    return await repository.save(newPriceList)
  }
}
