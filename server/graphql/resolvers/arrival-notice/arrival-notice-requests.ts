import { Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In, Not } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ArrivalNotice } from '../../../entities'

export const arrivalNoticeRequestsResolver = {
  async arrivalNoticeRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertedParams.where || !convertedParams.where.status) {
      convertedParams.where.status = Not(In([ORDER_STATUS.PENDING, ORDER_STATUS.EDITING]))
    }
    convertedParams.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(ArrivalNotice).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'creator', 'updater']
    })

    return { items, total }
  }
}
