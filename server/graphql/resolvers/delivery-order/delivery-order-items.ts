import { Domain } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { DeliveryOrder, OrderInventory } from '../../../entities'
import { Product } from '@things-factory/product-base'
import { Inventory } from '@things-factory/warehouse-base'
import { inventoryCheckResolver } from '../inventory-check/inventory-check'

export const deliveryOrderItemsResolver = {
  async deliveryOrderItems(_: any, { name }, context: any) {
    const { domain }: { domain: Domain } = context.state
    const deliveryOrder: DeliveryOrder = await getRepository(DeliveryOrder).findOne({
      where: { domain, name }
    })

    let [items, total] = await getRepository(OrderInventory).findAndCount({
      where: { domain, deliveryOrder },
      relations: ['inventory', 'inventory.product', 'inventory.reusablePallet']
    })

    items = items
    .map((oi: OrderInventory) => {
      const inventory: Inventory = oi.inventory
      const product: Product = inventory.product
      return {
        inventory: inventory,
        productName: `${product.name} (${product.description})`,
        packingType: inventory.packingType,
        batchId: inventory.batchId,
        releaseQty: oi.releaseQty,
        releaseUomValue: oi.releaseUomValue,
        remark: oi.remark,
        crossDocking: oi.crossDocking,
        pallet: inventory?.reusablePallet && inventory?.reusablePallet?.name ? inventory.reusablePallet.name : ''
      }
    })
    .reduce((newItem, item) => {
      var foundItem = newItem.find(newItem => 
        newItem.productName === item.productName &&
        newItem.batchId === item.batchId &&
        newItem.crossDocking === item.crossDocking &&
        newItem.pallet === item.pallet
      )
      if (!foundItem) {
        foundItem = {
          inventory: item.inventory,
          productName: item.productName,
          packingType: item.packingType,
          batchId: item.batchId,
          releaseQty: item.releaseQty,
          releaseUomValue: item.releaseUomValue,
          palletQty: 1,
          remark: item.remark,
          crossDocking: item.crossDocking,
          pallet: item.pallet,
        }

        newItem.push(foundItem)
        return newItem
      } else {
        return newItem.map(ni => {
          if (
            ni.productName === item.productName &&
            ni.batchId === item.batchId &&
            ni.crossDocking === item.crossDocking &&
            ni.pallet === item.pallet    
            ) {
            return {
              ...ni,
              palletQty: ni.palletQty + 1,
              releaseQty: ni.releaseQty + item.releaseQty,
              releaseUomValue: ni.releaseUomValue + item.releaseUomValue
            }
          } else {
            return ni
          }
        })
      }
    }, [])

    items = items.map((prod: any) => {
      return {
        ...prod,
        systemRemark: prod?.remark ? prod.remark : (prod.crossDocking ?
         prod.pallet === '' ? `${prod.palletQty} PALLET(S) [C/D]` : `${prod.palletQty} PALLET(S) (${prod.pallet}) [C/D]` :
         prod.pallet === '' ? `${prod.palletQty} PALLET(S)` : `${prod.palletQty} PALLET(S) (${prod.pallet})`)
      }
    })
    
    return { items, total }
  }
}
