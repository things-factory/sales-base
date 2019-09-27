import { orderInventoryResolver } from './order-inventory'
import { orderInventoriesResolver } from './order-inventories'

import { updateOrderInventory } from './update-order-inventory'
import { createOrderInventory } from './create-order-inventory'
import { deleteOrderInventory } from './delete-order-inventory'
import { deleteOrderInventories } from './delete-order-inventories'

export const Query = {
  ...orderInventoriesResolver,
  ...orderInventoryResolver
}

export const Mutation = {
  ...updateOrderInventory,
  ...createOrderInventory,
  ...deleteOrderInventory,
  ...deleteOrderInventories
}
