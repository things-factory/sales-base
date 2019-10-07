import { getRepository } from 'typeorm'
import { DeliveryOrder } from '../../../entities'
import { Attachment, deleteAttachment } from '@things-factory/attachment-base'

export const deleteDeliveryOrder = {
  async deleteDeliveryOrder(_: any, { name }, context: any) {
    const foundDO = await getRepository(DeliveryOrder).findOne({
      where: { domain: context.state.domain, name }
    })
    if (foundDO) {
      await getRepository(DeliveryOrder).delete({ domain: context.state.domain, name })
      const previousAttachment: Attachment = await getRepository(Attachment).findOne({
        where: { domain: context.state.domain, refBy: foundDO.id }
      })
      if (previousAttachment) await deleteAttachment(_, { id: previousAttachment.id }, context)
    }
    return true
  }
}
