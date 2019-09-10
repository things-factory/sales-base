import { Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ArrivalNotice } from '../../../entities'
import { ORDER_STATUS } from 'server/enum'

export const requestedArrivalNoticesResolver = {
  async requestedArrivalNotices(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.status = In([
      ORDER_STATUS.PENDING_RECIEVE,
      ORDER_STATUS.INTRANSIT,
      ORDER_STATUS.ARRIVED,
      ORDER_STATUS.PROCESSING
    ])

    const [items, total] = await getRepository(ArrivalNotice).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'orderProducts', 'orderVass', 'collectionOrder', 'creator', 'updater']
    })

    return { items, total }
  }
}
