import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { CollectionOrder } from '../../../entities'
import { schema } from '@things-factory/attachment-base'

export const editCollectionOrder = {
  async editCollectionOrder(_: any, { name, collectionOrder, attachments }, context: any) {
    const foundCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).findOne({
      where: { domain: context.state.domain, name },
      relations: ['creator', 'updater']
    })
    const foundRefBy = foundCollectionOrder.id

    try {
      if (!foundCollectionOrder) throw new Error(`Collection order doesn't exists.`)
      if (foundCollectionOrder.status !== ORDER_STATUS.EDITING) throw new Error('Not editable status.')

      return await getManager().transaction(async () => {
        // 1. update collection order
        const updatedCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).save({
          ...foundCollectionOrder,
          ...collectionOrder,
          status: ORDER_STATUS.PENDING,
          updater: context.state.user
        })

        // 2. Create attachment
        if (!attachments) return updatedCollectionOrder
        await schema.resolvers.mutations[0].deleteAttachmentsByRef(_, { foundRefBy }, context)

        attachments = attachments.map(attachment => {
          return { refBy: updatedCollectionOrder.id, file: attachment, category: 'ORDER' }
        })
        await schema.resolvers.mutations[0].createAttachments(_, { attachments }, context)

        return updatedCollectionOrder
      })
    } catch (e) {
      throw e
    }
  }
}
