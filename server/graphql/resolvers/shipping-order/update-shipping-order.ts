import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { ShippingOrder } from '../../../entities'

export const updateShippingOrder = {
  async updateShippingOrder(_: any, { name, patch }, context: any) {
    const shippingOrder = await getRepository(ShippingOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      }
    })

    return await getRepository(ShippingOrder).save({
      ...shippingOrder,
      ...patch,
      updater: context.state.user
    })
  }
}
