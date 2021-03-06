import { getPermittedBizplaceIds, Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In, IsNull } from 'typeorm'
import { ArrivalNotice } from '../../../entities/arrival-notice'
import { GoodsReceivalNote } from '../../../entities/goods-receival-note'

export const goodsReceivalNotesResolver = {
  async goodsReceivalNotes(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    const arrivalNoticeParam: any = params.filters.find((param: any) => param.name === 'arrivalNoticeNo')
    const arrivalNoticeRefNoParam = params.filters.find(param => param.name === 'arrivalNoticeRefNo')

    const bizplaceParam = params.filters.find(param => param.name === 'bizplaceName')
    if (bizplaceParam) {
      const foundBizplaces: Bizplace[] = await getRepository(Bizplace).find({
        where: {
          ...convertListParams({ filters: [{ ...bizplaceParam, name: 'name' }] }).where,
          bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
        }
      })

      if (foundBizplaces && foundBizplaces.length) {
        convertedParams.where.bizplace = In(foundBizplaces.map((foundBizplace: Bizplace) => foundBizplace.id))
      } else {
        convertedParams.where.bizplace = IsNull()
      }
    } else {
      convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
    }

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

    return { items, total }
  }
}
