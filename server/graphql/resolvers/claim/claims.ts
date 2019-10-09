import { ListParam, convertListParams } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Claim } from '../../../entities'

export const claimsResolver = {
  async claims(_: any, params: ListParam, context: any) {
    const convertedParams = convertListParams(params)
    let [items, total] = await getRepository(Claim).findAndCount({
      ...convertedParams,
      relations: [
        'domain',
        'creator',
        'updater',
        'collectionOrder',
        'collectionOrder.bizplace',
        'collectionOrder.transportDriver',
        'collectionOrder.transportVehicle',
        'deliveryOrder',
        'deliveryOrder.bizplace',
        'deliveryOrder.transportDriver',
        'deliveryOrder.transportVehicle'
      ]
    })

    items = items.map(item => {
      if (item.collectionOrder) {
        item['orderName'] = item.collectionOrder.name
        item['to'] = item.collectionOrder.bizplace.name
        item['from'] = item.collectionOrder.from
        item['transportDriverName'] = item.collectionOrder.transportDriver.name
        item['transportVehicleName'] = item.collectionOrder.transportVehicle.name
      } else if (item.deliveryOrder) {
        item['orderName'] = item.deliveryOrder.name
        item['to'] = item.deliveryOrder.to
        item['from'] = item.deliveryOrder.bizplace.name
        item['transportDriverName'] = item.deliveryOrder.transportDriver.name
        item['transportVehicleName'] = item.deliveryOrder.transportVehicle.name
      }
      return item
    })

    return { items, total }
  }
}
