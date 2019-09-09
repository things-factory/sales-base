import { getRepository, In } from 'typeorm'
import { Bizplace } from '@things-factory/biz-base'
import { DeliveryOrder } from '../../../entities'

export const updateDeliveryOrder = {
  async updateDeliveryOrder(_: any, { name, patch }, context: any) {
    const deliveryOrder = await getRepository(DeliveryOrder).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      }
    })

    return await getRepository(DeliveryOrder).save({
      ...deliveryOrder,
      ...patch,
      updater: context.state.user
    })
  }
}
