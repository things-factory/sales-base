import { ListParam, convertListParams } from '@things-factory/shell'
import { Attachment } from '@things-factory/attachment-base'
import { getRepository } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const customerReceivalNotesResolver = {
  async customerReceivalNotes(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    let [items, total] = await getRepository(GoodsReceivalNote).findAndCount({
      ...convertedParams,
      where: {
        domain: context.state.domain,
        bizplace: context.state.mainBizplace
      },
      relations: ['domain', 'arrivalNotice', 'bizplace', 'creator', 'updater']
    })

    items = await Promise.all(
      items.map(async item => {
        const foundAttachments = await getRepository(Attachment).find({
          where: {
            domain: context.state.domain,
            refBy: item.id
          }
        })

        return {
          ...item,
          attachments: foundAttachments
        }
      })
    )

    return { items, total }
  }
}
