import { Bizplace } from '@things-factory/biz-base'
import { convertListParams } from '@things-factory/shell'
import { Between, getRepository, Raw, In } from 'typeorm'
import { ArrivalNotice, JobSheet } from '../../../entities'

export const bizplaceArrivalNoticesResolver = {
  async bizplaceArrivalNotices(_: any, { arrivalNotice, filters, pagination, sortings }, context: any) {
    const customerBizplace: Bizplace = await getRepository(Bizplace).findOne(arrivalNotice.bizplace.id)

    const fromDate: Date = new Date(arrivalNotice.fromDate)
    let toDate: Date = new Date(arrivalNotice.toDate)
    toDate.setDate(toDate.getDate() + 1)

    const convertedParams = convertListParams({ filters, pagination, sortings })
    let where = { domain: context.state.domain }

    if (arrivalNotice && arrivalNotice.jobSheetNo) {
      const _jobSheet = await getRepository(JobSheet).findOne({
        where: {
          domain: context.state.domain,
          bizplace: customerBizplace,
          name: Raw(alias => `LOWER(${alias}) LIKE '${arrivalNotice.jobSheetNo.toLowerCase()}'`)
        }
      })
      where['jobSheet'] = _jobSheet
    }

    where['updatedAt'] = Between(fromDate.toISOString(), toDate.toISOString())
    convertedParams.where = {
      ...convertedParams.where,
      ...where,
      bizplace: customerBizplace
    }

    const result = await getRepository(ArrivalNotice).findAndCount({
      ...convertedParams,
      relations: ['domain', 'jobSheet', 'bizplace', 'updater']
    })

    let items = result[0] as any
    let total = result[1]

    items = await Promise.all(
      items.map(async (item: ArrivalNotice) => {
        return {
          name: item.name,
          containerNo: item.containerNo,
          refNo: item.refNo,
          jobSheet: item?.jobSheet ? item.jobSheet : '',
          updatedAt: item.updatedAt,
          updater: item.updater
        } as any
      })
    )

    return { items, total }
  }
}
