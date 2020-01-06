import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { VasOrder } from '../../../entities'
export const vasOrderResolver = {
  async vasOrder(_: any, { name }, context: any) {
    return await getRepository(VasOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      },
      relations: [
        'domain',
        'bizplace',
        'orderVass',
        'orderVass.vas',
        'orderVass.inventory',
        'orderVass.inventory.product',
        'orderVass.inventory.location',
        'orderVass.inventory.warehouse',
        'creator',
        'updater'
      ]
    })
  }
}
