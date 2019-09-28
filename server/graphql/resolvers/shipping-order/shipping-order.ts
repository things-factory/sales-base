import { getRepository, In } from 'typeorm'
import { ShippingOrder } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const shippingOrderResolver = {
  async shippingOrder(_: any, { name }, context: any) {
    return await getRepository(ShippingOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: ['domain', 'bizplace', 'creator', 'updater']
    })
  }
}
