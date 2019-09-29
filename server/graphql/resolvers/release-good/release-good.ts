import { Bizplace } from '@things-factory/biz-base'
import { getRepository, In } from 'typeorm'
import { DeliveryOrder, ReleaseGood, ShippingOrder } from '../../../entities'

export const releaseGoodResolver = {
  async releaseGood(_: any, { name }, context: any) {
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
        releaseGoodInfo: {
          containerNo: shippingOrder.containerNo,
          containerLeavingDate: shippingOrder.containerLeavingDate,
          containerArrivalDate: shippingOrder.containerArrivalDate,
          shipName: shippingOrder.shipName
        },
        inventoryInfos: releaseGood.orderInventories.map(productINV => {
          const inventory = productINV.inventory
          return {
            name: productINV.name,
            batchId: inventory.batchId,
            product: inventory.product,
            packingType: inventory.packingType,
            qty: inventory.qty
          }
        })
      }
    } else if (shippingOrder && deliveryOrder) {
      return {
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
            qty: inventory.qty
          }
        })
      }
    } else if (!shippingOrder && deliveryOrder) {
      return {
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
            qty: inventory.qty
          }
        })
      }
    } else {
      return {
        inventoryInfos: releaseGood.orderInventories.map(productINV => {
          const inventory = productINV.inventory
          return {
            name: productINV.name,
            batchId: inventory.batchId,
            product: inventory.product,
            packingType: inventory.packingType,
            qty: inventory.qty
          }
        })
      }
    }
  }
}
