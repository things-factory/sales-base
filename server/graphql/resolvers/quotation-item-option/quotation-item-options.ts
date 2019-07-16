import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { QuotationItemOption } from '../../../entities'

export const quotationItemOptionsResolver = {
  async quotationItemOptions(_: any, params: ListParam) {
    const queryBuilder = getRepository(QuotationItemOption).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('QuotationItemOption.domain', 'Domain')
      .leftJoinAndSelect('QuotationItemOption.quotationItem', 'QuotationItem')
      .leftJoinAndSelect('QuotationItemOption.creator', 'Creator')
      .leftJoinAndSelect('QuotationItemOption.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
