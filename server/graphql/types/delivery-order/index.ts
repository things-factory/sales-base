import { DeliveryOrder } from './delivery-order'
import { DeliveryOrderList } from './delivery-order-list'
import { DeliveryOrderPatch } from './delivery-order-patch'
import { NewDeliveryOrder } from './new-delivery-order'

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

export const Types = [DeliveryOrder, NewDeliveryOrder, DeliveryOrderPatch, DeliveryOrderList]
