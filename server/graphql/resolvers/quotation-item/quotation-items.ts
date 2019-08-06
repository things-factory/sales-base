import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { QuotationItem } from '../../../entities'

export const quotationItemsResolver = {
  async quotationItems(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(QuotationItem).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('QuotationItem.domain', 'Domain')
      .leftJoinAndSelect('QuotationItem.product', 'Product')
      .leftJoinAndSelect('QuotationItem.quotation', 'Quotation')
      .leftJoinAndSelect('QuotationItem.options', 'Options')
      .leftJoinAndSelect('QuotationItem.creator', 'Creator')
      .leftJoinAndSelect('QuotationItem.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
