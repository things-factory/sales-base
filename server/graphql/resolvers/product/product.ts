import { getRepository } from 'typeorm'
import { Product } from '../../../entities'

export const productResolver = {
  async product(_: any, { name }, context: any) {
    return await getRepository(Product).findOne({
      where: { domain: context.domain, name },
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
