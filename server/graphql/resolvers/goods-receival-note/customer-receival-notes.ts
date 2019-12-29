import { Attachment } from '@things-factory/attachment-base'
import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In, Not } from 'typeorm'
import { GRN_STATUS } from '../../../constants'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const customerReceivalNotesResolver = {
  async customerReceivalNotes(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    if (!convertedParams.where || !convertedParams.where.status) {
      convertedParams.where.status = Not(In([GRN_STATUS.PENDING_PROCESS]))
    }
    convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))

    let [items, total] = await getRepository(GoodsReceivalNote).findAndCount({
      ...convertedParams,
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
