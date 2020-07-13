import { getPermittedBizplaceIds } from '@things-factory/biz-base'
import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository, SelectQueryBuilder } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const bizplaceArrivalNoticesResolver = {
  async bizplaceArrivalNotices(_: any, params: ListParam, context: any) {
    const bizplaceFilter = params.filters.find(param => param.name === 'bizplaceId')
    const fromDateFilter = params.filters.find(param => param.name === 'fromDate')
    const toDateFilter = params.filters.find(param => param.name === 'toDate')
    const containerNoFilter = params.filters.find(param => param.name === 'containerNo')
    const jobSheetFilter = params.filters.find(param => param.name === 'jobSheet')

    if (!bizplaceFilter) {
      params.filters.push({
        name: 'bizplaceId',
        operator: 'in',
        value: await getPermittedBizplaceIds(context.state.domain, context.state.user),
        relation: false
      })
    }

    let fromDateValue: Date = new Date(fromDateFilter.value)
    let toDateValue: Date = new Date(toDateFilter.value)
    toDateValue.setDate(toDateValue.getDate() + 1)

    const qb: SelectQueryBuilder<ArrivalNotice> = getRepository(ArrivalNotice).createQueryBuilder('an')
    buildQuery(qb, params, context)
    qb.innerJoinAndSelect('an.domain', 'domain')
    qb.innerJoinAndSelect('an.bizplace', 'bizplace')
    qb.innerJoinAndSelect('an.jobSheet', 'jobSheet')
    qb.innerJoinAndSelect('an.creator', 'creator')
    qb.innerJoinAndSelect('an.updater', 'updater')
    qb.where('an.domain_id = :domainId', { domainId: context.state.domain.id })

    if (fromDateFilter && toDateFilter) {
      qb.andWhere('an.updatedAt >= :fromDate', { fromDate: fromDateValue.toISOString() })
      qb.andWhere('an.updatedAt <= :toDate', { toDate: toDateValue.toISOString() })
    }

    if (bizplaceFilter) {
      qb.andWhere('an.bizplace_id = :bizplaceId', { bizplaceId: bizplaceFilter.value })
    }

    if (containerNoFilter) {
      qb.andWhere('an.container_no ILIKE :containerNo', { containerNo: containerNoFilter.value })
    }

    if (jobSheetFilter) {
      qb.andWhere('jobSheet.name ILIKE :jobSheetNo', { jobSheetNo: jobSheetFilter.value })
    }

    const [items, total] = await qb.getManyAndCount()
    return { items, total }
  }
}
