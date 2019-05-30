import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const updatePriceList = {
  async updatePriceList(_, { id, patch }) {
    const repository = getRepository(PriceList)

    const priceList = await repository.findOne({ id })

    return await repository.save({
      ...priceList,
      ...patch
    })
  }
}
