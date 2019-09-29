import { convertListParams, ListParam } from '@things-factory/shell'
import { ORDER_STATUS } from '../../../constants'
import { getRepository, In } from 'typeorm'
import { ReleaseGood } from '../../../entities'

export const releaseGoodRequestsResolver = {
  async releaseGoodRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertListParams.where || !convertListParams.where.status) {
      convertedParams.where.status = In([
        ORDER_STATUS.PENDING_RECEIVE,
        ORDER_STATUS.READY_TO_PICK,
        ORDER_STATUS.PICKING,
        ORDER_STATUS.DONE,
        ORDER_STATUS.PROCESSING,
        ORDER_STATUS.REJECTED
      ])
    }

    const [items, total] = await getRepository(ReleaseGood).findAndCount({
      ...convertedParams,
      relations: [
        'domain',
        'bizplace',
        'orderInventories',
        'orderVass',
        'deliveryOrder',
        'shippingOrder',
        'creator',
        'updater'
      ]
    })

    return { items, total }
  }
}
