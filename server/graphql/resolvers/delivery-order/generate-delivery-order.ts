import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'

export const generateDeliveryOrder = {
  async generateDeliveryOrder(_: any, { deliveryOrder }, context: any) {
    return await getManager().transaction(async () => {
      // 1. Create delivery order
      const createdDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).save({
        ...deliveryOrder,
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user
      })

      return createdDeliveryOrder
    })
  }
}
