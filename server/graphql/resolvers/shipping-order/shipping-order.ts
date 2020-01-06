import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { ShippingOrder } from '../../../entities'

export const shippingOrderResolver = {
  async shippingOrder(_: any, { name }, context: any) {
    return await getRepository(ShippingOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      },
      relations: ['domain', 'bizplace', 'creator', 'updater']
    })
  }
}
