import { getRepository } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { GRN_STATUS } from '../../../constants'
import { Attachment, createAttachment, deleteAttachment } from '@things-factory/attachment-base'

export const submitGoodsReceivalNote = {
  async submitGoodsReceivalNote(_: any, { name, file }, context: any) {
    const foundGRN: GoodsReceivalNote = await getRepository(GoodsReceivalNote).findOne({
      where: { domain: context.state.domain, name }
    })

    const foundAttachment: Attachment = await getRepository(Attachment).findOne({
      where: { domain: context.state.domain, refBy: foundGRN.id }
    })

    const attachment = {
      refBy: foundGRN.id,
      file: file,
      category: 'GRN'
    }

    if (!foundAttachment) {
      await createAttachment(_, { attachment }, context)
    } else {
      const id = foundAttachment.id
      await deleteAttachment(_, { id }, context)
      await createAttachment(_, { attachment }, context)
    }

    return await getRepository(GoodsReceivalNote).save({
      ...foundGRN,
      status: GRN_STATUS.SUBMITTED,
      updater: context.state.user
    })
  }
}
