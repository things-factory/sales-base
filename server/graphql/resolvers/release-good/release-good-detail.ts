import { Bizplace } from '@things-factory/biz-base'
import { Inventory } from '@things-factory/warehouse-base'
import { getRepository, In } from 'typeorm'
import { OrderInventory, ReleaseGood, ShippingOrder } from '../../../entities'

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
        'orderVass.inventory',
        'creator',
        'updater'
      ]
    })

    const shippingOrder: ShippingOrder = releaseGood.shippingOrder

    return {
      ...releaseGood,
      releaseGoodInfo: {
        containerLeavingDate: (shippingOrder && shippingOrder.containerLeavingDate) || '',
        containerArrivalDate: (shippingOrder && shippingOrder.containerArrivalDate) || '',
        shipName: (shippingOrder && shippingOrder.shipName) || ''
      },
      inventoryInfos: releaseGood.orderInventories.map((orderInv: OrderInventory) => {
        const inventory: Inventory = orderInv.inventory
        return {
          batchId: inventory.batchId,
          product: inventory.product,
          packingType: inventory.packingType,
          name: inventory.name,
          location: inventory.location,
          qty: inventory.qty,
          weight: inventory.weight,
          releaseQty: orderInv.releaseQty,
          releaseWeight: orderInv.releaseWeight
        }
      })
    }
  }
}
