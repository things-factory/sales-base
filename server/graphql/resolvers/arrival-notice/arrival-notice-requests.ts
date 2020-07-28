import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository, SelectQueryBuilder } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ArrivalNotice } from '../../../entities'

export const arrivalNoticeRequestsResolver = {
  async arrivalNoticeRequests(_: any, params: ListParam, context: any) {
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

      const qb: SelectQueryBuilder<ArrivalNotice> = getRepository(ArrivalNotice).createQueryBuilder('an')
      buildQuery(qb, params, context)
      qb.addSelect(subQuery => {
        return subQuery
          .select('COALESCE("ccd".rank, 99999)', 'rank')
          .from('common_code_details', 'ccd')
          .innerJoin('ccd.commonCode', 'cc')
          .where('"ccd"."name" = "an"."status"')
          .andWhere('"ccd"."domain_id" = "an"."domain_id"')
          .andWhere('"cc"."name" = \'ORDER_STATUS\'')
      }, 'rank')
      qb.leftJoinAndSelect('an.domain', 'domain')
      qb.leftJoinAndSelect('an.releaseGood', 'rg')
      qb.leftJoinAndSelect('an.bizplace', 'bizplace')
      qb.leftJoinAndSelect('an.creator', 'creator')
      qb.leftJoinAndSelect('an.updater', 'updater')

      const arrChildSortData = ['bizplace']
      const sort = (params.sortings || []).reduce(
        (acc, sort) => ({
          ...acc,
          [arrChildSortData.indexOf(sort.name) >= 0 ? sort.name + '.name' : 'an.' + sort.name]: sort.desc
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
