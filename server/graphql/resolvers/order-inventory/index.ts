import { orderInventoryResolver } from './order-inventory'
import { orderInventoriesResolver } from './order-inventories'
import { inventoriesByOrderResolver } from './inventories-by-order'

import { updateOrderInventory } from './update-order-inventory'
import { createOrderInventory } from './create-order-inventory'
import { deleteOrderInventory } from './delete-order-inventory'
import { deleteOrderInventories } from './delete-order-inventories'

export const Query = {
  ...orderInventoriesResolver,
  ...orderInventoryResolver,
  ...inventoriesByOrderResolver
}

export const Mutation = {
  ...updateOrderInventory,
  ...createOrderInventory,
  ...deleteOrderInventory,
  ...deleteOrderInventories
}
