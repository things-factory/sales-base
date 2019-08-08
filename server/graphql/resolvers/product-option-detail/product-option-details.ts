import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const productOptionDetailsResolver = {
  async productOptionDetails(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(ProductOptionDetail).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}