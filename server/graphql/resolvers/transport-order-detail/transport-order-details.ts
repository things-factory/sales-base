import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { TransportOrderDetail } from '../../../entities'

export const transportOrderDetailsResolver = {
  async transportOrderDetails(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(TransportOrderDetail).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}