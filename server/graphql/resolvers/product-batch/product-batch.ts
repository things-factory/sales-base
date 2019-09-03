import { getRepository, In } from 'typeorm'
import { ProductBatch } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const productBatchResolver = {
  async productBatch(_: any, { name }, context: any) {
    return await getRepository(ProductBatch).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: [
        'domain',
        'product',
        'collectionOrders',
        'deliveryOrders',
        'shippingOrders',
        'refTo',
        'aliases',
        'creator',
        'updater'
      ]
    })
  }
}
