import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { ProductOption } from '../../../entities'

export const productOptionsResolver = {
  async productOptions(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)

    const [items, total] = await getRepository(ProductOption).findAndCount({
      ...convertedParams,
      relations: ['domain', 'product', 'productOptionDetails', 'creator', 'updater']
    })

    return { items, total }
  }
}
