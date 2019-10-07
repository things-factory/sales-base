import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { DeliveryOrder } from '../../../entities'
import { Attachment } from '@things-factory/attachment-base'
import { deleteAttachment, createAttachments } from '@things-factory/attachment-base'

export const editDeliveryOrder = {
  async editDeliveryOrder(_: any, { name, deliveryOrder, attachments }, context: any) {
    const foundDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
      where: { domain: context.state.domain, name, status: ORDER_STATUS.EDITING },
      relations: ['creator', 'updater']
    })

    try {
      if (!foundDeliveryOrder) throw new Error(`Delivery order doesn't exists.`)
      if (foundDeliveryOrder.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      // 1. delete found attachment
      if (foundDeliveryOrder) {
        const foundAttachment: Attachment = await getRepository(Attachment).findOne({
          where: { domain: context.state.domain, refBy: foundDeliveryOrder.id }
        })
        await deleteAttachment(_, { id: foundAttachment.id }, context)
      }

      return await getManager().transaction(async () => {
        // 2. update delivery order
        const updatedDeliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).save({
          ...foundDeliveryOrder,
          ...deliveryOrder,
          status: ORDER_STATUS.PENDING,
          updater: context.state.user
        })

        // 3. Create attachment
        if (!attachments) return updatedDeliveryOrder
        attachments = attachments.map(attachment => {
          return { refBy: updatedDeliveryOrder.id, file: attachment, category: 'ORDER' }
        })
        await createAttachments(_, { attachments }, context)

        return updatedDeliveryOrder
      })
    } catch (e) {
      throw e
    }
  }
}
