import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { OrderInventory } from '../../../entities'

export const orderInventoriesResolver = {
  async orderInventories(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    const [items, total] = await getRepository(OrderInventory).findAndCount({
      ...convertedParams,
      relations: ['domain', 'arrivalNotice', 'releaseGood', 'shippingOrder', 'deliveryOrder', 'creator', 'updater']
    })
    return { items, total }
  }
}
