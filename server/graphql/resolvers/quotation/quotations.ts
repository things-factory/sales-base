import { getRepository } from 'typeorm'
import { Quotation } from '../../../entities'
import { ListParam, buildQuery } from '@things-factory/shell'

export const quotationsResolver = {
  async quotations(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Quotation).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
