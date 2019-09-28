import { ShippingOrder } from './shipping-order'
import { NewShippingOrder } from './new-shipping-order'
import { ShippingOrderPatch } from './shipping-order-patch'
import { ShippingOrderList } from './shipping-order-list'

export const Mutation = `
  createShippingOrder (
    shippingOrder: NewShippingOrder!
  ): ShippingOrder

  updateShippingOrder (
    name: String!
    patch: ShippingOrderPatch!
  ): ShippingOrder

  deleteShippingOrder (
    name: String!
  ): Boolean
`

export const Query = `
  shippingOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ShippingOrderList
  shippingOrder(name: String!): ShippingOrder
`

export const Types = [ShippingOrder, NewShippingOrder, ShippingOrderPatch, ShippingOrderList]
