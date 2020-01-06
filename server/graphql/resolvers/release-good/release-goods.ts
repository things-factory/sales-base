import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ReleaseGood } from '../../../entities'

export const releaseGoodsResolver = {
  async releaseGoods(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))

    const [items, total] = await getRepository(ReleaseGood).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'shippingOrder', 'orderInventories', 'orderVass', 'creator', 'updater']
    })
    return { items, total }
  }
}
