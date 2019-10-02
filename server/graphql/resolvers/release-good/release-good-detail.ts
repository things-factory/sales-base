import { Bizplace } from '@things-factory/biz-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder, OrderInventory, ReleaseGood, ShippingOrder } from '../../../entities'

export const releaseGoodDetailResolver = {
  async releaseGoodDetail(_: any, { name }, context: any) {
    const releaseGood: ReleaseGood = await getRepository(ReleaseGood).findOne({
      where: {
        domain: context.state.domain,
        name,
        bizplace: In(context.state.bizplaces.map((bizplace: Bizplace) => bizplace.id))
      },
      relations: [
        'domain',
        'bizplace',
        'shippingOrder',
        'orderInventories',
        'orderInventories.inventory',
        'orderInventories.inventory.product',
        'orderInventories.inventory.location',
        'orderVass',
        'orderVass.vas',
        'deliveryOrder',
        'deliveryOrder.transportVehicle',
        'deliveryOrder.transportDriver',
        'creator',
        'updater'
      ]
    })

    const deliveryOrder: DeliveryOrder = releaseGood.deliveryOrder

    return {
      ...releaseGood,
      releaseGoodInfo: {
        transportDriver: (deliveryOrder && deliveryOrder.transportDriver.name) || '',
        transportVehicle: (deliveryOrder && deliveryOrder.transportVehicle.name) || ''
      },
      inventoryInfos: releaseGood.orderInventories.map((orderInv: OrderInventory) => {
        const inventory: Inventory = orderInv.inventory
        return {
          batchId: inventory.batchId,
          product: inventory.product,
          packingType: inventory.packingType,
          inventoryName: inventory.name,
          location: inventory.location,
          qty: inventory.qty,
          releaseQty: orderInv.releaseQty
        }
      })
    }
  }
}
