import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const updatePriceList = {
  async updatePriceList(_: any, { name, patch }, context: any) {
    const repository = getRepository(PriceList)
    const priceList = await repository.findOne({ domain: context.domain, name })

    return await repository.save({
      ...priceList,
      ...patch,
      updaterId: context.state.user.id
    })
  }
}
