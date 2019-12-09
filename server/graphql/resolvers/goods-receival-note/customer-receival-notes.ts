import { ListParam, convertListParams } from '@things-factory/shell'
import { ArrivalNotice } from '../../../entities/arrival-notice'
import { Attachment } from '@things-factory/attachment-base'
import { getRepository, In, IsNull } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'
import { GRN_STATUS } from '../../../constants'

export const customerReceivalNotesResolver = {
  async customerReceivalNotes(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

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
      where: {
        domain: context.state.domain,
        bizplace: context.state.mainBizplace,
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
