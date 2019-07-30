import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deliveryOrdersResolver = {
  async deliveryOrders(_: any, params: ListParam) {
    const queryBuilder = getRepository(DeliveryOrder).createQueryBuilder()
    buildQuery(queryBuilder, params)
    const [items, total] = await queryBuilder
      .leftJoinAndSelect('DeliveryOrder.domain', 'Domain')
      .leftJoinAndSelect('DeliveryOrder.customer', 'Customer')
      .leftJoinAndSelect('DeliveryOrder.transportOrder', 'TransportOrder')
      .leftJoinAndSelect('DeliveryOrder.creator', 'Creator')
      .leftJoinAndSelect('DeliveryOrder.updater', 'Updater')
      .getManyAndCount()

    return { items, total }
  }
}
