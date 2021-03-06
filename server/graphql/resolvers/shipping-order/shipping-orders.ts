import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ShippingOrder } from '../../../entities'

export const shippingOrdersResolver = {
  async shippingOrders(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))

    const [items, total] = await getRepository(ShippingOrder).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'creator', 'updater']
    })

    return { items, total }
  }
}
