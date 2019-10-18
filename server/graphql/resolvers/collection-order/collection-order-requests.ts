import { convertListParams, ListParam } from '@things-factory/shell'
import { ORDER_STATUS } from '../../../constants'
import { getRepository, In } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const collectionOrderRequestsResolver = {
  async collectionOrderRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertListParams.where || !convertListParams.where.status) {
      convertedParams.where.status = In([
        ORDER_STATUS.PENDING_RECEIVE,
        ORDER_STATUS.READY_TO_DISPATCH,
        ORDER_STATUS.COLLECTING,
        ORDER_STATUS.REJECTED,
        ORDER_STATUS.DONE
      ])
    }

    const [items, total] = await getRepository(CollectionOrder).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'arrivalNotice', 'transportOrderDetails', 'creator', 'updater']
    })

    return { items, total }
  }
}
