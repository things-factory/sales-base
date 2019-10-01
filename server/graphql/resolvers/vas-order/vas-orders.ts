import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { VasOrder } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const vasOrdersResolver = {
  async vasOrders(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(VasOrder).findAndCount({
      ...convertedParams,
      relations: [
        'domain',
        'bizplace',
        'orderVass',
        'orderVass.inventory',
        'orderVass.inventory.product',
        'creator',
        'updater'
      ]
    })
    return { items, total }
  }
}
