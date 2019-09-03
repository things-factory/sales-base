import { getUserBizplaces } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { ProductOption } from '../../../entities'

export const productOptionsResolver = {
  async productOptions(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const userBizplaces = await getUserBizplaces(context)
    convertedParams.where.bizplace = In(userBizplaces.map(userBizplace => userBizplace.id))

    const [items, total] = await getRepository(ProductOption).findAndCount({
      ...convertedParams,
      relations: ['domain', 'product', 'productOptionDetails', 'creator', 'updater']
    })

    return { items, total }
  }
}
