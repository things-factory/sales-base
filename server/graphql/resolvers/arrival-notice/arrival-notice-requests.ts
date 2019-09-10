import { convertListParams, ListParam } from '@things-factory/shell'
import { ORDER_STATUS } from 'server/enum'
import { getRepository, In } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const arrivalNoticeRequestsResolver = {
  async arrivalNoticeRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertListParams.where || !convertListParams.where.status) {
      convertedParams.where.status = In([
        ORDER_STATUS.PENDING_RECEIVE,
        ORDER_STATUS.INTRANSIT,
        ORDER_STATUS.ARRIVED,
        ORDER_STATUS.PROCESSING
      ])
    }

    const [items, total] = await getRepository(ArrivalNotice).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'orderProducts', 'orderVass', 'collectionOrder', 'creator', 'updater']
    })

    return { items, total }
  }
}
