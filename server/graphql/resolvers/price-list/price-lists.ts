import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { PriceList } from '../../../entities'

export const priceListsResolver = {
  async priceLists(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(PriceList).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('PriceList.domain', 'Domain')
      .leftJoinAndSelect('PriceList.product', 'Product')
      .leftJoinAndSelect('PriceList.creator', 'Creator')
      .leftJoinAndSelect('PriceList.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
