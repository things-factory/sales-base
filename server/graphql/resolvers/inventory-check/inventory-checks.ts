import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { InventoryCheck } from '../../../entities'

export const inventoryChecksResolver = {
  async inventoryChecks(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(InventoryCheck).findAndCount({
      ...convertedParams,
      relations: ['domain', 'creator', 'updater']
    })
    return { items, total }
  }
}