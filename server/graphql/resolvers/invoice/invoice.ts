import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const invoiceResolver = {
  async invoice(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Invoice).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
