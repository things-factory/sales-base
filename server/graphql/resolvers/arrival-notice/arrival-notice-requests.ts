import { getPermittedBizplaceIds, Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam, buildQuery } from '@things-factory/shell'
import { getRepository, In, Not, IsNull, SelectQueryBuilder } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ArrivalNotice } from '../../../entities'

export const arrivalNoticeRequestsResolver = {
  async arrivalNoticeRequests(_: any, params: ListParam, context: any) {
    const statusFilter = params.filters.some((e) => e.name === 'status')

    if (!statusFilter) {
      params.filters.push({
        name: 'status',
        operator: 'notin',
        value: [ORDER_STATUS.PENDING, ORDER_STATUS.EDITING],
        relation: false,
      })
    }

    const qb: SelectQueryBuilder<ArrivalNotice> = getRepository(ArrivalNotice).createQueryBuilder('an')
    buildQuery(qb, params, context)
    qb.addSelect((subQuery) => {
      return subQuery
        .select('COALESCE("ccd".rank, 1000)', 'rank')
        .from('common_code_details', 'ccd')
        .innerJoin('ccd.commonCode', 'cc')
        .where('"ccd"."name" = "an"."status"')
        .andWhere('"ccd"."domain_id" = "an"."domain_id"')
        .andWhere('"cc"."name" = \'ORDER_STATUS\'')
    }, 'rank')
    qb.leftJoinAndSelect('an.domain', 'domain')
    qb.leftJoinAndSelect('an.bizplace', 'bizplace')
    qb.leftJoinAndSelect('an.creator', 'creator')
    qb.leftJoinAndSelect('an.updater', 'updater')

    const arrChildSortData = ['bizplace']
    const sort = (params.sortings || []).reduce(
      (acc, sort) => ({
        ...acc,
        [arrChildSortData.indexOf(sort.name) >= 0 ? sort.name + '.name' : 'an.' + sort.name]: sort.desc
          ? 'DESC'
          : 'ASC',
      }),
      !params.sortings.some((e) => e.name === 'status') ? { rank: 'ASC' } : {}
    )

    qb.orderBy(sort)

    const [items, total] = await qb.getManyAndCount()

    return { items, total }
  },
}
