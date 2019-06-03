import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'
import { ListParam, buildQuery } from '@things-factory/shell'

export const priceListsResolver = {
  async priceLists(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(PriceList).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
