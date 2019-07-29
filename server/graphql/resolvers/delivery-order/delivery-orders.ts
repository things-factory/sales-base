import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deliveryOrdersResolver = {
  async purchaseOrders(_: any, params: ListParam) {
    const queryBuilder = getRepository(DeliveryOrder).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('PurchaseOrder.domain', 'Domain')
      .leftJoinAndSelect('PurchaseOrder.creator', 'Creator')
      .leftJoinAndSelect('PurchaseOrder.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
