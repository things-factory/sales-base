import { convertListParams, ListParam } from '@things-factory/shell'
import { ORDER_STATUS } from '../../../constants'
import { getRepository, In, Not } from 'typeorm'
import { ReleaseGood } from '../../../entities'
import { Bizplace } from '@things-factory/biz-base'

export const releaseGoodRequestsResolver = {
  async releaseGoodRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertedParams.where || !convertedParams.where.status) {
      convertedParams.where.status = Not(In([ORDER_STATUS.PENDING, ORDER_STATUS.EDITING]))
    }
    convertedParams.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(ReleaseGood).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'orderInventories', 'orderVass', 'shippingOrder', 'creator', 'updater']
    })

    return { items, total }
  }
}
