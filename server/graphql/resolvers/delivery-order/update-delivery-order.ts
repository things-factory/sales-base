import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const updateDeliveryOrder = {
  async updateDeliveryOrder(_: any, { name, patch }, context: any) {
    const deliveryOrder = await getRepository(DeliveryOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
      }
    })

    return await getRepository(DeliveryOrder).save({
      ...deliveryOrder,
      ...patch,
      updater: context.state.user
    })
  }
}
