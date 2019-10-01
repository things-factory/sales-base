import { Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ArrivalNotice } from '../../../entities'

export const arrivalNoticeRequestsResolver = {
  async arrivalNoticeRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertedParams.where || !convertedParams.where.status) {
      convertedParams.where.status = In([
        ORDER_STATUS.PENDING_RECEIVE,
        ORDER_STATUS.INTRANSIT,
        ORDER_STATUS.ARRIVED,
        ORDER_STATUS.PROCESSING,
        ORDER_STATUS.REJECTED
      ])
    }
    convertedParams.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(ArrivalNotice).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'collectionOrder', 'creator', 'updater']
    })

    return { items, total }
  }
}
