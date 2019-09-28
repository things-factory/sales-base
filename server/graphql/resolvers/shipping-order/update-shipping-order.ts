import { getRepository, In } from 'typeorm'
import { ShippingOrder } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const updateShippingOrder = {
  async updateShippingOrder(_: any, { name, patch }, context: any) {
    const shippingOrder = await getRepository(ShippingOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      }
    })

    return await getRepository(ShippingOrder).save({
      ...shippingOrder,
      ...patch,
      updater: context.state.user
    })
  }
}
