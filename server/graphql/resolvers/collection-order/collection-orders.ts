import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const collectionOrdersResolver = {
  async collectionOrders(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(CollectionOrder).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}