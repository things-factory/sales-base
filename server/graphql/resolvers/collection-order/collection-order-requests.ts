import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In, Not } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { CollectionOrder } from '../../../entities'

export const collectionOrderRequestsResolver = {
  async collectionOrderRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertedParams.where || !convertedParams.where.status) {
      convertedParams.where.status = Not(In([ORDER_STATUS.PENDING, ORDER_STATUS.EDITING]))
    }
    convertedParams.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))

    const [items, total] = await getRepository(CollectionOrder).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'arrivalNotice', 'transportDriver', 'transportVehicle', 'creator', 'updater']
    })

    return { items, total }
  }
}
