import { Bizplace } from '@things-factory/biz-base'
import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository, In } from 'typeorm'
import { Product } from '../../../entities'

export const productsResolver = {
  async products(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    convertedParams.where.bizplace = In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))

    const [items, total] = await getRepository(Product).findAndCount({
      ...convertedParams,
      relations: ['domain', 'bizplace', 'refTo', 'aliases', 'options', 'batches', 'creator', 'updater']
    })

    return { items, total }
  }
}
