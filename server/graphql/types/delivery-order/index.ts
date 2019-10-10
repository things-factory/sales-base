import { DeliveryOrder } from './delivery-order'
import { DeliveryOrderList } from './delivery-order-list'
import { DeliveryOrderPatch } from './delivery-order-patch'
import { NewDeliveryOrder } from './new-delivery-order'
import { GenerateDeliveryOrder } from './generate-delivery-order'

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
  ): Boolean

  generateDeliveryOrder (
    deliveryOrder: GenerateDeliveryOrder!
    attachments: [Upload]
  ): DeliveryOrder

  confirmDeliveryOrder (
    name: String!
  ): DeliveryOrder

  receiveDeliveryOrder (
    name: String!
  ): DeliveryOrder

  checkDeliveredOrder (
    name: String!
    patch: DeliveryOrderPatch
  ): DeliveryOrder

  dispatchDeliveryOrder (
    name: String!
    patch: DeliveryOrderPatch
  ): DeliveryOrder

  rejectDeliveryOrder (
    name: String!
    patch: DeliveryOrderPatch!
  ): DeliveryOrder
`

export const Query = `
  deliveryOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): DeliveryOrderList
  deliveryOrder(name: String!): DeliveryOrder
  deliveryOrderRequests(filters: [Filter], pagination: Pagination, sortings: [Sorting]): DeliveryOrderList

`

export const Types = [DeliveryOrder, NewDeliveryOrder, DeliveryOrderPatch, DeliveryOrderList, GenerateDeliveryOrder]
