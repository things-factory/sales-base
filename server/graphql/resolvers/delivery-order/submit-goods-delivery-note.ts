import { getManager } from 'typeorm'
import { DeliveryOrder } from '../../../entities/delivery-order'
import { ORDER_STATUS } from '../../../constants'
import { Attachment, createAttachment, deleteAttachment } from '@things-factory/attachment-base'

export const submitGoodsDeliveryNote = {
  async submitGoodsDeliveryNote(_: any, { name, file }, context: any) {
    return await getManager().transaction(async trxMgr => {
      const foundDO: DeliveryOrder = await trxMgr.getRepository(DeliveryOrder).findOne({
        where: { domain: context.state.domain, name },
        relations: ['bizplace']
      })

      if (!foundDO) throw new Error(`DO doesn't exists.`)

      const foundAttachment: Attachment = await trxMgr.getRepository(Attachment).findOne({
        where: { domain: context.state.domain, refBy: foundDO.id }
      })

      const attachment = {
        refBy: foundDO.id,
        file: file,
        category: 'DO'
      }

      if (!foundAttachment) {
        await createAttachment(_, { attachment }, context)
      } else {
        const id = foundAttachment.id
        await deleteAttachment(_, { id }, context)
        await createAttachment(_, { attachment }, context)
      }

      return await trxMgr.getRepository(DeliveryOrder).save({
        ...foundDO,
        status: ORDER_STATUS.DONE,
        updater: context.state.user
      })
    })
  }
}
