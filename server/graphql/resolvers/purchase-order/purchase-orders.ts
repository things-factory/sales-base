import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const purchaseOrdersResolver = {
  async purchaseOrders(_: any, params: ListParam) {
    const queryBuilder = getRepository(PurchaseOrder).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('PurchaseOrder.domain', 'Domain')
      .leftJoinAndSelect('PurchaseOrder.quotation', 'Quotation')
      .leftJoinAndSelect('PurchaseOrder.creator', 'Creator')
      .leftJoinAndSelect('PurchaseOrder.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
