import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { PurchaseOrder } from '../../../entities'

export const purchaseOrdersResolver = {
  async purchaseOrders(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(PurchaseOrder).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
