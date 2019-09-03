import { getUserBizplaces } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ProductOptionDetail } from '../../../entities'

export const productOptionDetailsResolver = {
  async productOptionDetails(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const userBizplaces = await getUserBizplaces(context)
    convertedParams.where.bizplace = In(userBizplaces.map(userBizplace => userBizplace.id))

    const [items, total] = await getRepository(ProductOptionDetail).findAndCount({
      ...convertedParams,
      relations: ['domain', 'productOption', 'creator', 'updater']
    })

    return { items, total }
  }
}
