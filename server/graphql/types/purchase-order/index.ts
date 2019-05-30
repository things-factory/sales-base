import { PurchaseOrder } from './purchase-order'
import { NewPurchaseOrder } from './new-purchase-order'
import { PurchaseOrderPatch } from './purchase-order-patch'

export const Mutation = `
  createPurchaseOrder (
    purchaseOrder: NewPurchaseOrder!
  ): PurchaseOrder

  updatePurchaseOrder (
    id: String!
    patch: PurchaseOrderPatch!
  ): PurchaseOrder

  deletePurchaseOrder (
    id: String!
  ): PurchaseOrder

  publishPurchaseOrder (
    id: String!
  ): PurchaseOrder
`

export const Query = `
  purchaseOrders: [PurchaseOrder]
  purchaseOrder(id: String!): PurchaseOrder
`

export const Types = [PurchaseOrder, NewPurchaseOrder, PurchaseOrderPatch]
