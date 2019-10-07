import { getRepository } from 'typeorm'
import { CollectionOrder } from '../../../entities'
import { Attachment, deleteAttachment } from '@things-factory/attachment-base'

export const deleteCollectionOrder = {
  async deleteCollectionOrder(_: any, { name }, context: any) {
    const foundCO = await getRepository(CollectionOrder).findOne({
      where: { domain: context.state.domain, name }
    })
    if (foundCO) {
      await getRepository(CollectionOrder).delete({ domain: context.state.domain, name })
      const previousAttachment: Attachment = await getRepository(Attachment).findOne({
        where: { domain: context.state.domain, refBy: foundCO.id }
      })
      if (previousAttachment) await deleteAttachment(_, { id: previousAttachment.id }, context)
    }
    return true
  }
}
