import { ShippingOrder } from './shipping-order'
import { NewShippingOrder } from './new-shipping-order'
import { ShippingOrderPatch } from './shipping-order-patch'
import { ShippingOrderList } from './shipping-order-list'
import { Filter, Pagination, Sorting } from '@things-factory/shell'

export const Mutation = `
  createShippingOrder (
    shippingOrder: NewShippingOrder!
  ): ShippingOrder

  updateShippingOrder (
    id: String!
    patch: ShippingOrderPatch!
  ): ShippingOrder

  deleteShippingOrder (
    id: String!
  ): ShippingOrder
`

export const Query = `
  shippingOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ShippingOrderList
  shippingOrder(id: String!): ShippingOrder
`

export const Types = [Filter, Pagination, Sorting, ShippingOrder, NewShippingOrder, ShippingOrderPatch, ShippingOrderList]
