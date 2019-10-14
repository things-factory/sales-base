import { convertListParams, ListParam } from '@things-factory/shell'
import { ORDER_STATUS } from '../../../constants'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder } from '../../../entities'

export const deliveryOrderRequestsResolver = {
  async deliveryOrderRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertListParams.where || !convertListParams.where.status) {
      convertedParams.where.status = In([
        ORDER_STATUS.PENDING_RECEIVE,
        ORDER_STATUS.READY_TO_DISPATCH,
        ORDER_STATUS.DELIVERING,
        ORDER_STATUS.REJECTED,
        ORDER_STATUS.DONE
      ])
    }

    const [items, total] = await getRepository(DeliveryOrder).findAndCount({
      ...convertedParams,
      relations: [
        'domain',
        'bizplace',
        'transportOrderDetails',
        'transportOrderDetails.transportDriver',
        'transportOrderDetails.transportVehicle',
        'creator',
        'updater'
      ]
    })

    return { items, total }
  }
}
