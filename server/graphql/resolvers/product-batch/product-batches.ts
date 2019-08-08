import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const productBatchesResolver = {
  async productBatches(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(ProductBatch).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}