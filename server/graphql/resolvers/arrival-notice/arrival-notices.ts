import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const arrivalNoticesResolver = {
  async arrivalNotices(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))

    const [items, total] = await getRepository(ArrivalNotice).findAndCount({
      ...convertedParams,
      relations: [
        'domain',
        'bizplace',
        'jobSheet',
        'releaseGood',
        'orderProducts',
        'orderVass',
        'creator',
        'updater',
        'acceptedBy'
      ]
    })

    return { items, total }
  }
}
