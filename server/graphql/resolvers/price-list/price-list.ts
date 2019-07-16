import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const priceListResolver = {
  async priceList(_: any, { name }, context: any) {
    return await getRepository(PriceList).findOne({
      where: { domain: context.domain, name },
      relations: ['domain', 'product', 'creator', 'updater']
    })
  }
}
