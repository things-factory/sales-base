import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ShippingOrder } from '../../../entities'

export const shippingOrdersResolver = {
  async shippingOrders(_: any, params: ListParam, context: any) {
    const queryBuilder = getRepository(ShippingOrder).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder.getManyAndCount()

    return { items, total }
  }
}
