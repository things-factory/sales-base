import { Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const arrivalNoticesResolver = {
  async arrivalNotices(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(ArrivalNotice).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'collectionOrder', 'creator', 'updater']
    })

    return { items, total }
  }
}
