import { Bizplace } from '@things-factory/biz-base'
import { convertListParams } from '@things-factory/shell'
import { Between, getRepository } from 'typeorm'
import { ArrivalNotice } from '../../../entities'

export const bizplaceArrivalNoticesResolver = {
  async bizplaceArrivalNotices(_: any, { arrivalNotice, filters, pagination, sortings }, context: any) {
    const customerBizplace: Bizplace = await getRepository(Bizplace).findOne(arrivalNotice.bizplace.id)

    const fromDate: Date = new Date(arrivalNotice.fromDate)
    let toDate: Date = new Date(arrivalNotice.toDate)
    toDate.setDate(toDate.getDate() + 1)

    const convertedParams = convertListParams({ filters, pagination, sortings })
    let where = { domain: context.state.domain }

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
          jobSheetNo: item?.jobSheet ? item.jobSheet.name : '',
          updatedAt: item.updatedAt,
          updater: item.updater
        } as any
      })
    )

    return { items, total }
  }
}
