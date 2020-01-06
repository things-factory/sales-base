import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Invoice } from '../../../entities'

export const invoicesResolver = {
  async invoices(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(Invoice).createQueryBuilder()
    buildQuery(queryBuilder, params, context)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('Invoice.domain', 'Domain')
      .leftJoinAndSelect('Invoice.customer', 'Bizplace')
      .leftJoinAndSelect('Invoice.purchaseOrder', 'PurchaseOrder')
      .leftJoinAndSelect('Invoice.creator', 'Creator')
      .leftJoinAndSelect('Invoice.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
