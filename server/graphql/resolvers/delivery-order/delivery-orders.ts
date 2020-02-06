import { getPermittedBizplaceIds, Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In, IsNull } from 'typeorm'
import { Attachment } from '@things-factory/attachment-base'
import { DeliveryOrder, ReleaseGood } from '../../../entities'

export const deliveryOrdersResolver = {
  async deliveryOrders(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    const releaseGoodParam = params.filters.find(param => param.name === 'releaseGoodNo')
    if (releaseGoodParam) {
      let arrFilters = []
      if (releaseGoodParam) arrFilters.push({ ...releaseGoodParam, name: 'name' })
      const foundReleaseGoods: ReleaseGood[] = await getRepository(ReleaseGood).find({
        ...convertListParams({ filters: arrFilters })
      })
      if (foundReleaseGoods && foundReleaseGoods.length) {
        convertedParams.where.releaseGood = In(foundReleaseGoods.map((foundRG: ReleaseGood) => foundRG.id))
      } else {
        convertListParams.where.releaseGood = IsNull()
      }
    }

    const bizplaceParam = params.filters.find(param => param.name === 'bizplaceName')
    if (bizplaceParam) {
      const foundBizplaces: Bizplace[] = await getRepository(Bizplace).find({
        where: {
          ...convertListParams({ filters: [{ ...bizplaceParam, name: 'name' }] }).where,
          bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
        }
      })
      if (foundBizplaces && foundBizplaces.length) {
        convertedParams.where.bizplace = In(foundBizplaces.map((foundBizplace: Bizplace) => foundBizplace.id))
      } else {
        convertedParams.where.bizplace = IsNull()
      }
    } else {
      convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
    }

    let [items, total] = await getRepository(DeliveryOrder).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'releaseGood', 'transportDriver', 'transportVehicle', 'creator', 'updater']
    })

    items = await Promise.all(
      items.map(async item => {
        const foundAttachments = await getRepository(Attachment).find({
          where: {
            domain: context.state.domain,
            refBy: item.id
          }
        })
        return {
          ...item,
          attachments: foundAttachments
        }
      })
    )

    return { items, total }
  }
}
