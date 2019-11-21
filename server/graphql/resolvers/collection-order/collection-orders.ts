import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { CollectionOrder } from '../../../entities'

export const collectionOrdersResolver = {
  async collectionOrders(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))

    const [items, total] = await getRepository(CollectionOrder).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'arrivalNotice', 'transportDriver', 'transportVehicle', 'creator', 'updater']
    })

    return { items, total }
  }
}
