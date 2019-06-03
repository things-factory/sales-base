import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const quotationItemsResolver = {
  async quotationItems(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(QuotationItem).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
