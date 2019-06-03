import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const quotationItemOptionsResolver = {
  async quotationItemOptions(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(QuotationItemOption).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
