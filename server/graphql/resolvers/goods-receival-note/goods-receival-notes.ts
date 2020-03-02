import { Attachment } from '@things-factory/attachment-base'
import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In, IsNull } from 'typeorm'
import { ArrivalNotice } from '../../../entities/arrival-notice'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { ATTACHMENT_TYPE } from '../../../constants'

export const goodsReceivalNotesResolver = {
  async goodsReceivalNotes(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))

    const arrivalNoticeParam: any = params.filters.find((param: any) => param.name === 'arrivalNoticeNo')
    const arrivalNoticeRefNoParam = params.filters.find(param => param.name === 'arrivalNoticeRefNo')
    if (arrivalNoticeParam || arrivalNoticeRefNoParam) {
      let arrFilters = []
      if (arrivalNoticeParam) arrFilters.push({ ...arrivalNoticeParam, name: 'name' })
      if (arrivalNoticeRefNoParam) arrFilters.push({ ...arrivalNoticeRefNoParam, name: 'refNo' })
      const foundArrivalNotices: ArrivalNotice[] = await getRepository(ArrivalNotice).find({
        ...convertListParams({ filters: arrFilters })
      })
      if (foundArrivalNotices && foundArrivalNotices.length) {
        convertedParams.where.arrivalNotice = In(foundArrivalNotices.map((foundAN: ArrivalNotice) => foundAN.id))
      } else {
        convertListParams.where.arrivalNotice = IsNull()
      }
    }

    let [items, total] = await getRepository(GoodsReceivalNote).findAndCount({
      ...convertedParams,
      relations: ['domain', 'arrivalNotice', 'bizplace', 'creator', 'updater']
    })

    items = await Promise.all(
      items.map(async item => {
        const foundAttachments = await getRepository(Attachment).find({
          where: {
            domain: context.state.domain,
            refBy: item.id,
            category: ATTACHMENT_TYPE.GRN
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
