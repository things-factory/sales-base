import { convertListParams, ListParam } from '@things-factory/shell'
import { ORDER_STATUS } from '../../../constants'
import { getRepository, In } from 'typeorm'
import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { VasOrder } from '../../../entities'

export const vasOrderRequestsResolver = {
  async vasOrderRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertedParams.where || !convertedParams.where.status) {
      convertedParams.where.status = In([
        ORDER_STATUS.PENDING_RECEIVE,
        ORDER_STATUS.READY_TO_EXECUTE,
        ORDER_STATUS.DONE,
        ORDER_STATUS.EXECUTING,
        ORDER_STATUS.REJECTED
      ])
    }
    convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))

    const [items, total] = await getRepository(VasOrder).findAndCount({
      ...convertedParams,
      relations: [
        'domain',
        'bizplace',
        'orderVass',
        'orderVass.inventory',
        'orderVass.inventory.product',
        'creator',
        'updater'
      ]
    })

    return { items, total }
  }
}
