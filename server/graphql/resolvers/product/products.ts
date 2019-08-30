import { getUserBizplaces } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'

export const productsResolver = {
  async products(_: any, params: ListParam, context: any) {
    const productRepository = getRepository(Product)
    const alias = productRepository.createQueryBuilder().alias

    const convertedParams = convertListParams(params)
    const userBizplaces = await getUserBizplaces(context)
    convertedParams.where = {
      ...convertedParams.where,
      [`"${alias}"."bizplace_id"`]: In(userBizplaces.map(userBizplace => userBizplace.id))
    }

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
