import { buildQuery, ListParam, convertListParams } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'
import { getUserBizplaces } from '@things-factory/biz-base'

export const productsResolver = {
  async products(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.bizplace_id = In(await getUserBizplaces(context).map((bizplace: any) => bizplace.id))
    const [items, total] = await getRepository(Product).findAndCount({
      ...convertedParams,
      relations: [
        'domain',
        'bizplace',
        'refTo',
        'collectionOrders',
        'deliveryOrders',
        'shippingOrders',
        'aliases',
        'options',
        'batches',
        'creator',
        'updater'
      ]
    })

    return { items, total }
  }
}
