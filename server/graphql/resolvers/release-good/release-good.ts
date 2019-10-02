import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { ReleaseGood } from '../../../entities'

export const releaseGoodResolver = {
  async releaseGood(_: any, { name }, context: any) {
    return await getRepository(ReleaseGood).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: [
        'domain',
        'bizplace',
        'shippingOrder',
        'orderInventories',
        'orderInventories.inventory',
        'orderInventories.inventory.product',
        'orderVass',
        'orderVass.vas',
        'deliveryOrder',
        'creator',
        'updater'
      ]
    })
  }
}
