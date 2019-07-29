import { DeliveryOrder } from './delivery-order'
import { NewDeliveryOrder } from './new-delivery-order'
import { DeliveryOrderPatch } from './delivery-order-patch'
import { DeliveryOrderList } from './delivery-order-list'
import { Filter, Pagination, Sorting } from '@things-factory/shell'

export const Mutation = `
  createDeliveryOrder (
    deliveryOrder: NewDeliveryOrder!
  ): DeliveryOrder

  updateDeliveryOrder (
    name: String!
    patch: DeliveryOrderPatch!
  ): DeliveryOrder

  deleteDeliveryOrder (
    name: String!
  ): DeliveryOrder
`

export const Query = `
  deliveryOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): DeliveryOrderList
  deliveryOrder(name: String!): DeliveryOrder
`

export const Types = [
  Filter,
  Pagination,
  Sorting,
  DeliveryOrder,
  NewDeliveryOrder,
  DeliveryOrderPatch,
  DeliveryOrderList
]
