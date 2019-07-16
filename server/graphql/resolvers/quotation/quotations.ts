import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'

export const quotationsResolver = {
  async quotations(_: any, params: ListParam) {
    const queryBuilder = getRepository(Quotation).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('Quotation.customer', 'Customer')
      .leftJoinAndSelect('Quotation.items', 'Items')
      .leftJoinAndSelect('Quotation.creator', 'Creator')
      .leftJoinAndSelect('Quotation.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
