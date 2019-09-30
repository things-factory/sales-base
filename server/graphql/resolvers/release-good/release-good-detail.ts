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

    const shippingOrder: ShippingOrder = releaseGood.shippingOrder
    const deliveryOrder: DeliveryOrder = releaseGood.deliveryOrder

    return {
      ...releaseGood,
      releaseGoodInfo: {
        containerNo: (shippingOrder && shippingOrder.containerNo) || '',
        containerLeavingDate: (shippingOrder && shippingOrder.containerLeavingDate) || '',
        containerArrivalDate: (shippingOrder && shippingOrder.containerArrivalDate) || '',
        shipName: (shippingOrder && shippingOrder.shipName) || '',
        transportDriver: (deliveryOrder && deliveryOrder.transportDriver.name) || '',
        transportVehicle: (deliveryOrder && deliveryOrder.transportVehicle.name) || '',
        deliveryDateTime: (deliveryOrder && deliveryOrder.deliveryDateTime) || '',
        telNo: (deliveryOrder && deliveryOrder.telNo) || ''
      },
      inventoryInfos: releaseGood.orderInventories.map((orderInv: OrderInventory) => {
        const inventory: Inventory = orderInv.inventory
        return {
          name: orderInv.name,
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
