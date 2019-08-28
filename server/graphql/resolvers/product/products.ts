import { buildQuery, ListParam, convertListParams } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'
import { getUserBizplaces } from '@things-factory/biz-base'

export const productsResolver = {
  async products(_: any, params: ListParam, context: any) {
    const [items, total] = await getRepository(Product).findAndCount({
      where: {
        ...convertListParams(params),
        bizplace: In(await getUserBizplaces(context))
      },
      relations: [
        'domain',
        'bizplace',
        'refTo',
        'collectionOrder',
        'deliveryOrder',
        'shippingOrder',
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
