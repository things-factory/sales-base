import { getPermittedBizplaceIds, Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam, buildQuery } from '@things-factory/shell'
import { getRepository, In, Not, IsNull, SelectQueryBuilder } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ReturnOrder } from '../../../entities'

export const returnOrderRequestsResolver = {
  async returnOrderRequests(_: any, params: ListParam, context: any) {
    try {
      const statusFilter = params.filters.some(e => e.name === 'status')
      const bizplaceFilter = params.filters.find(param => param.name === 'bizplaceId')

      if (!statusFilter) {
        params.filters.push({
          name: 'status',
          operator: 'notin',
          value: [ORDER_STATUS.PENDING, ORDER_STATUS.EDITING],
          relation: false
        })
      }

      if (!bizplaceFilter) {
        params.filters.push({
          name: 'bizplaceId',
          operator: 'in',
          value: await getPermittedBizplaceIds(context.state.domain, context.state.user),
          relation: false
        })
      }

      const qb: SelectQueryBuilder<ReturnOrder> = getRepository(ReturnOrder).createQueryBuilder('ro')
      buildQuery(qb, params, context)
      qb.addSelect(subQuery => {
        return subQuery
          .select('COALESCE("ccd".rank, 99999)', 'rank')
          .from('common_code_details', 'ccd')
          .innerJoin('ccd.commonCode', 'cc')
          .where('"ccd"."name" = "ro"."status"')
          .andWhere('"ccd"."domain_id" = "ro"."domain_id"')
          .andWhere('"cc"."name" = \'RETURN_LIST_STATUS\'')
      }, 'rank')
      qb.leftJoinAndSelect('ro.domain', 'domain')
      qb.leftJoinAndSelect('ro.bizplace', 'bizplace')
      qb.leftJoinAndSelect('ro.creator', 'creator')
      qb.leftJoinAndSelect('ro.updater', 'updater')
      qb.leftJoinAndSelect('ro.acceptedBy', 'acceptedBy')

      const arrChildSortData = ['bizplace']
      const sort = (params.sortings || []).reduce(
        (acc, sort) => ({
          ...acc,
          [arrChildSortData.indexOf(sort.name) >= 0 ? sort.name + '.name' : 'ro.' + sort.name]: sort.desc
            ? 'DESC'
            : 'ASC'
        }),
        !params.sortings.some(e => e.name === 'status') ? { rank: 'ASC' } : {}
      )

      qb.orderBy(sort)

      const [items, total] = await qb.getManyAndCount()

      return { items, total }
    } catch (error) {
      throw error
    }
  }
}
