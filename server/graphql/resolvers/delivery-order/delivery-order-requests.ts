import { convertListParams, ListParam } from '@things-factory/shell'
import { ORDER_STATUS } from '../../../constants'
import { getRepository, In, Not } from 'typeorm'
import { DeliveryOrder } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const deliveryOrderRequestsResolver = {
  async deliveryOrderRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertedParams.where || !convertedParams.where.status) {
      convertedParams.where.status = Not(In([ORDER_STATUS.PENDING, ORDER_STATUS.EDITING]))
    }
    convertedParams.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(DeliveryOrder).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'transportOrderDetails', 'creator', 'updater']
    })

    return { items, total }
  }
}
