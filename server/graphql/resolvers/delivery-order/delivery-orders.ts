import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { buildQuery, convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, SelectQueryBuilder } from 'typeorm'
import { DeliveryOrder, ReleaseGood } from '../../../entities'

export const deliveryOrdersResolver = {
  async deliveryOrders(_: any, params: ListParam, context: any) {
    const bizplaceFilter = params.filters.find(param => param.name === 'bizplaceId')
    if (!bizplaceFilter) {
      params.filters.push({
        name: 'bizplaceId',
        operator: 'in',
        value: await getPermittedBizplaceIds(context.state.domain, context.state.user),
        relation: false
      })
    }

    const releaseGoodParam = params.filters.find(param => param.name === 'releaseGoodNo')
    if (releaseGoodParam) {
      let arrFilters = []
      params.filters.splice(
        params.filters.findIndex(item => item.name == 'releaseGoodNo'), 1
      )
      arrFilters.push({ ...releaseGoodParam, name: 'name' })

      const foundReleaseGoods: ReleaseGood[] = await getRepository(ReleaseGood).find({
        ...convertListParams({ filters: arrFilters })
      })

      if (foundReleaseGoods && foundReleaseGoods.length) {
        params.filters.push({
          name: 'releaseGoodId',
          operator: 'in',
          value: foundReleaseGoods.map((releaseGood: ReleaseGood) => releaseGood.id),
          relation: false
        })
      }
    }

    const qb: SelectQueryBuilder<DeliveryOrder> = getRepository(DeliveryOrder).createQueryBuilder('do')
    buildQuery(qb, params, context)
    qb.addSelect(subQuery => {
      return subQuery
        .select('COALESCE("ccd".rank, 99999)', 'rank')
        .from('common_code_details', 'ccd')
        .innerJoin('ccd.commonCode', 'cc')
        .where('"ccd"."name" = "do"."status"')
        .andWhere('"ccd"."domain_id" = "do"."domain_id"')
        .andWhere('"cc"."name" = \'DELIVERY_STATUS\'')
    }, 'rank')
    qb.leftJoinAndSelect('do.domain', 'domain')
    qb.leftJoinAndSelect('do.bizplace', 'bizplace')
    qb.leftJoinAndSelect('do.releaseGood', 'rg')
    qb.leftJoinAndSelect('do.transportDriver', 'td')
    qb.leftJoinAndSelect('do.transportVehicle', 'th')
    qb.leftJoinAndSelect('do.creator', 'creator')
    qb.leftJoinAndSelect('do.updater', 'updater')

    const arrChildSortData = ['bizplace', 'releaseGood']
    const sort = (params.sortings || []).reduce(
      (acc, sort) => ({
        ...acc,
        [arrChildSortData.indexOf(sort.name) >= 0 ? sort.name + '.name' : 'do.' + sort.name]: sort.desc
          ? 'DESC'
          : 'ASC'
      }),
      !params.sortings.some(e => e.name === 'status') ? { rank: 'ASC' } : {}
    )

    qb.orderBy(sort)
    const [items, total] = await qb.getManyAndCount()

    return { items, total }
  }
}
