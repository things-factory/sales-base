import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const productBatchesResolver = {
  async productBatches(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(ProductBatch).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('ProductBatch.domain', 'Domain')
      .leftJoinAndSelect('ProductBatch.product', 'Product')
      .leftJoinAndSelect('ProductBatch.lots', 'Lots')
      .leftJoinAndSelect('ProductBatch.creator', 'Creator')
      .leftJoinAndSelect('ProductBatch.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
