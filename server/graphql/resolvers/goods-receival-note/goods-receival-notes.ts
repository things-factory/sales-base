import { ListParam, convertListParams } from '@things-factory/shell'
import { ArrivalNotice } from '../../../entities/arrival-notice'
import { getRepository, In, IsNull } from 'typeorm'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const goodsReceivalNotesResolver = {
  async goodsReceivalNotes(_: any, params: ListParam, context: any) {
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

    const [items, total] = await getRepository(GoodsReceivalNote).findAndCount({
      ...convertedParams,
      relations: ['domain', 'arrivalNotice', 'bizplace', 'creator', 'updater']
    })
    return { items, total }
  }
}
