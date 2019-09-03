import { Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ProductBatch } from '../../../entities'

export const productBatchesResolver = {
  async productBatches(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(ProductBatch).findAndCount({
      ...convertedParams,
      relations: [
        'domain',
        'product',
        'refTo',
        'aliases',
        'deliveryOrders',
        'collectionOrders',
        'shippingOrders',
        'creator',
        'updater'
      ]
    })

    return { items, total }
  }
}
