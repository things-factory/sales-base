import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const deletePriceList = {
  async deletePriceList(_, { id }) {
    const repository = getRepository(PriceList)

    return await repository.delete(id)
  }
}
