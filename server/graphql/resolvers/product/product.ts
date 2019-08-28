import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'
import { getUserBizplaces } from '@things-factory/biz-base'

export const productResolver = {
  async product(_: any, { name }, context: any) {
    return await getRepository(Product).findOne({
      where: { domain: context.domain, name, bizplace: In(await getUserBizplaces(context)) },
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
  }
}
