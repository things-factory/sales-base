import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const deliveryOrdersResolver = {
  async deliveryOrders(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(DeliveryOrder).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'orderProducts', 'orderVass', 'creator', 'updater']
    })

    return { items, total }
  }
}
