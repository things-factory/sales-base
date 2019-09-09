import { convertListParams, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { OrderVas } from '../../../entities'

export const orderVassResolver = {
  async orderVass(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(OrderVas).findAndCount({
      ...convertedParams,
      relations: ['domain', 'arrivalNotice', 'vas', 'creator', 'updater']
    })
    return { items, total }
  }
}
