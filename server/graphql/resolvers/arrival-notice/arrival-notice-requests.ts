import { getPermittedBizplaceIds, Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam, buildQuery } from '@things-factory/shell'
import { getRepository, In, Not, IsNull, SelectQueryBuilder } from 'typeorm'
import { ORDER_STATUS } from '../../../constants'
import { ArrivalNotice } from '../../../entities'
import { CommonCode, CommonCodeDetail } from '@things-factory/code-base'

export const arrivalNoticeRequestsResolver = {
  async arrivalNoticeRequests(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    if (!convertedParams.where || !convertedParams.where.status) {
      convertedParams.where.status = Not(In([ORDER_STATUS.PENDING, ORDER_STATUS.EDITING]))
    }
    const bizplaceParam = params.filters.find((param) => param.name === 'bizplaceName')
    if (bizplaceParam) {
      const foundBizplaces: Bizplace[] = await getRepository(Bizplace).find({
        where: {
          ...convertListParams({ filters: [{ ...bizplaceParam, name: 'name' }] }).where,
          bizplace: In(await getPermittedBizplaceIds(context.state.domain, context.state.user)),
        },
      })
      if (foundBizplaces && foundBizplaces.length) {
        convertedParams.where.bizplace = In(foundBizplaces.map((foundBizplace: Bizplace) => foundBizplace.id))
      } else {
        convertedParams.where.bizplace = IsNull()
      }
    } else {
      convertedParams.where.bizplace = In(await getPermittedBizplaceIds(context.state.domain, context.state.user))
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
    qb.orderBy('rank')

    if (params.sortings?.length !== 0) {
      const arrChildSortData = ['bizplace']
      const sort = (params.sortings || []).reduce(
        (acc, sort) => ({
          ...acc,
          [arrChildSortData.indexOf(sort.name) >= 0 ? sort.name + '.name' : 'an.' + sort.name]: sort.desc
            ? 'DESC'
            : 'ASC',
        }),
        {}
      )
      qb.orderBy(sort)
    }

    const [items, total] = await qb.getManyAndCount()

    return { items, total }
  },
}
