import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { NewPurchaseOrder } from './new-purchase-order'
import { PurchaseOrder } from './purchase-order'
import { PurchaseOrderList } from './purchase-order-list'
import { PurchaseOrderPatch } from './purchase-order-patch'

export const Mutation = `
  createPurchaseOrder (
    purchaseOrder: NewPurchaseOrder!
  ): PurchaseOrder

  updatePurchaseOrder (
    name: String!
    patch: PurchaseOrderPatch!
  ): PurchaseOrder

  deletePurchaseOrder (
    name: String!
  ): PurchaseOrder
`

export const Query = `
  purchaseOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): PurchaseOrderList
  purchaseOrder(name: String!): PurchaseOrder
`

export const Types = [
  Filter,
  Pagination,
  Sorting,
  PurchaseOrder,
  NewPurchaseOrder,
  PurchaseOrderPatch,
  PurchaseOrderList
]
