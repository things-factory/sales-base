import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const quotationsResolver = {
  async quotations(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Quotation).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('Quotation.customer', 'Bizplace')
      .leftJoinAndSelect('Quotation.items', 'Items')
      .leftJoinAndSelect('Quotation.creator', 'Creator')
      .leftJoinAndSelect('Quotation.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
