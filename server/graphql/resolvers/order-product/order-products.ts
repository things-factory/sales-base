import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { OrderProduct } from '../../../entities'

export const orderProductsResolver = {
  async orderProducts(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(OrderProduct).findAndCount({
      ...convertedParams,
      relations: ['domain', 'arrivalNotice', 'product', 'creator', 'updater']
    })
    return { items, total }
  }
}
