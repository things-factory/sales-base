import { createPurchaseOrder } from './create-purchase-order'
import { deletePurchaseOrder } from './delete-purchase-order'
import { purchaseOrderResolver } from './purchase-order'
import { purchaseOrdersResolver } from './purchase-orders'
import { updatePurchaseOrder } from './update-purchase-order'

export const Query = {
  ...purchaseOrdersResolver,
  ...purchaseOrderResolver
}

export const Mutation = {
  ...updatePurchaseOrder,
  ...createPurchaseOrder,
  ...deletePurchaseOrder
}
