import { createAttachments } from '@things-factory/attachment-base'
import { Bizplace, getMyBizplace } from '@things-factory/biz-base'
import { getManager, getRepository } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ArrivalNotice, CollectionOrder } from '../../../entities'

export const generateCollectionOrder = {
  async generateCollectionOrder(_: any, { collectionOrder, attachments }, context: any) {
    return await getManager().transaction(async () => {
      const myBizplace: Bizplace = await getMyBizplace(context.state.user)
      // 1. Create collection order
      const createdCollectionOrder: CollectionOrder = await getRepository(CollectionOrder).save({
        ...collectionOrder,
        domain: context.state.domain,
        bizplace: myBizplace,
        arrivalNotice: await getRepository(ArrivalNotice).findOne({
          where: { domain: context.state.domain, name: collectionOrder.refNo }
        }),
        status: ORDER_STATUS.PENDING,
        creator: context.state.user,
        updater: context.state.user
      })

      // 2. Create attachment
      if (!attachments) return createdCollectionOrder

      attachments = attachments.map(attachment => {
        return { refBy: createdCollectionOrder.id, file: attachment, category: 'ORDER' }
      })
      await createAttachments(_, { attachments }, context)

      return createdCollectionOrder
    })
  }
}
