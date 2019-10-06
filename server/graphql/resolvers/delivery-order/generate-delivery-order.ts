import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'
import { schema } from '@things-factory/attachment-base'

export const generateDeliveryOrder = {
  async generateDeliveryOrder(_: any, { deliveryOrder, attachments }, context: any) {
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

      // 2. Create attachment
      if (!attachments) return createdDeliveryOrder

      attachments = attachments.map(attachment => {
        return { refBy: createdDeliveryOrder.id, file: attachment, category: 'ORDER' }
      })
      await schema.resolvers.mutations[0].createAttachments(_, { attachments }, context)

      return createdDeliveryOrder
    })
  }
}
