import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { VasOrder } from '../../../entities'
export const vasOrderResolver = {
  async vasOrder(_: any, { name }, context: any) {
    return await getRepository(VasOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: [
        'domain',
        'bizplace',
        'orderVass',
        'orderVass.vas',
        'orderVass.inventory',
        'orderVass.inventory.product',
        'orderVass.inventory.location',
        'creator',
        'updater'
      ]
    })
  }
}
