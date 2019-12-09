import { Attachment } from '@things-factory/attachment-base'
import { getMyBizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { GRN_STATUS } from '../../../constants'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const customerReceivalNotesResolver = {
  async customerReceivalNotes(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    let [items, total] = await getRepository(GoodsReceivalNote).findAndCount({
      ...convertedParams,
      where: {
        ...convertedParams.where,
        domain: context.state.domain,
        bizplace: await getMyBizplace(context.state.user),
        status: In([GRN_STATUS.SUBMITTED, GRN_STATUS.RECEIVED])
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
        item.status = item.status === GRN_STATUS.SUBMITTED ? GRN_STATUS.NEW : GRN_STATUS.OPENED
        return {
          ...item,
          attachments: foundAttachments
        }
      })
    )

    return { items, total }
  }
}
