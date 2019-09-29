import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder, ReleaseGood, ShippingOrder, OrderInventory } from '../../../entities'
import { Inventory } from '@things-factory/warehouse-base'

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
        'orderVass',
        'orderVass.vas',
        'deliveryOrder',
        'creator',
        'updater'
      ]
    })

    const shippingOrder: ShippingOrder = releaseGood.shippingOrder
    const deliveryOrder: DeliveryOrder = releaseGood.deliveryOrder

    if (shippingOrder && !deliveryOrder) {
      return {
        ...releaseGood,
        releaseGoodInfo: {
          containerNo: shippingOrder.containerNo,
          containerLeavingDate: shippingOrder.containerLeavingDate,
          containerArrivalDate: shippingOrder.containerArrivalDate,
          shipName: shippingOrder.shipName
        },
        inventoryInfos: releaseGood.orderInventories.map((productINV: OrderInventory) => {
          const inventory: Inventory = productINV.inventory
          return {
            name: productINV.name,
            batchId: inventory.batchId,
            product: inventory.product,
            packingType: inventory.packingType,
            qty: inventory.qty,
            releaseQty: productINV.releaseQty
          }
        })
      }
    } else if (shippingOrder && deliveryOrder) {
      return {
        ...releaseGood,
        releaseGoodInfo: {
          containerNo: shippingOrder.containerNo,
          containerLeavingDate: shippingOrder.containerLeavingDate,
          containerArrivalDate: shippingOrder.containerArrivalDate,
          shipName: shippingOrder.shipName,
          deliveryDateTime: deliveryOrder.deliveryDateTime,
          telNo: deliveryOrder.telNo
        },
        inventoryInfos: releaseGood.orderInventories.map(productINV => {
          const inventory = productINV.inventory
          return {
            name: productINV.name,
            batchId: inventory.batchId,
            product: inventory.product,
            packingType: inventory.packingType,
            qty: inventory.qty,
            releaseQty: productINV.releaseQty
          }
        })
      }
    } else if (!shippingOrder && deliveryOrder) {
      return {
        ...releaseGood,
        releaseGoodInfo: {
          deliveryDateTime: deliveryOrder.deliveryDateTime,
          telNo: deliveryOrder.telNo
        },
        inventoryInfos: releaseGood.orderInventories.map(productINV => {
          const inventory = productINV.inventory
          return {
            name: productINV.name,
            batchId: inventory.batchId,
            product: inventory.product,
            packingType: inventory.packingType,
            qty: inventory.qty,
            releaseQty: productINV.releaseQty
          }
        })
      }
    } else if (!shippingOrder && !deliveryOrder) {
      return {
        ...releaseGood,
        inventoryInfos: releaseGood.orderInventories.map(productINV => {
          const inventory = productINV.inventory
          return {
            name: productINV.name,
            batchId: inventory.batchId,
            product: inventory.product,
            packingType: inventory.packingType,
            qty: inventory.qty,
            releaseQty: productINV.releaseQty
          }
        })
      }
    }
  }
}
