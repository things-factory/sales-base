import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { CollectionOrder } from '../../../entities'
import { Attachment, deleteAttachments, createAttachments } from '@things-factory/attachment-base'

export const editCollectionOrder = {
  async editCollectionOrder(_: any, { name, collectionOrder, attachments }, context: any) {
    const foundCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['creator', 'updater']
    })

    try {
      if (!foundCollectionOrder) throw new Error(`Collection order doesn't exists.`)
      if (foundCollectionOrder.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      // 1. delete found attachment
      if (foundCollectionOrder) {
        const foundAttachment: Attachment = await getRepository(Attachment).findOne({
          where: { domain: context.state.domain, refBy: foundCollectionOrder.id }
        })
        await deleteAttachments(_, { id: foundAttachment.id }, context)
      }

      return await getManager().transaction(async () => {
        // 2. update collection order
        const updatedCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).save({
          ...foundCollectionOrder,
          ...collectionOrder,
          status: ORDER_STATUS.PENDING,
          updater: context.state.user
        })

        // 3. Create attachment
        if (!attachments) return updatedCollectionOrder

        attachments = attachments.map(attachment => {
          return { refBy: updatedCollectionOrder.id, file: attachment, category: 'ORDER' }
        })
        await createAttachments(_, { attachments }, context)

        return updatedCollectionOrder
      })
    } catch (e) {
      throw e
    }
  }
}
