import { inventoryCheckResolver } from './inventory-check'
import { inventoryChecksResolver } from './inventory-checks'

import { updateInventoryCheck } from './update-inventory-check'
import { updateMultipleInventoryCheck } from './update-multiple-inventory-check'
import { generateCycleCountResolver } from './generate-cycle-count'
import { createInventoryCheck } from './create-inventory-check'
import { deleteInventoryCheck } from './delete-inventory-check'
import { deleteInventoryChecks } from './delete-inventory-checks'

export const Query = {
  ...inventoryChecksResolver,
  ...inventoryCheckResolver
}

export const Mutation = {
  ...updateInventoryCheck,
  ...updateMultipleInventoryCheck,
  ...generateCycleCountResolver,
  ...createInventoryCheck,
  ...deleteInventoryCheck,
  ...deleteInventoryChecks
}
