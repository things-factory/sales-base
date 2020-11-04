import { ReturnOrder } from './return-order'
import { NewReturnOrder } from './new-return-order'
import { ReturnOrderPatch } from './return-order-patch'
import { ReturnOrderList } from './return-order-list'
import { ReturnOrderDetail } from './return-order-detail'

export const Mutation = `
  createReturnOrder (
    returnOrder: NewReturnOrder!
  ): ReturnOrder

  updateReturnOrder (
    name: String!
    patch: ReturnOrderPatch!
  ): ReturnOrder

  updateMultipleReturnOrder (
    patches: [ReturnOrderPatch]!
  ): [ReturnOrder]

  deleteReturnOrder (
    name: String!
  ): Boolean @priviledge(category: "order_customer", priviledge: "mutation")

  deleteReturnOrders (
    names: [String]!
  ): Boolean @priviledge(category: "order_customer", priviledge: "mutation")

  generateReturnOrder (
    returnOrder: NewReturnOrder
    file: Upload
  ): ReturnOrder @priviledge(category: "order_customer", priviledge: "mutation")

  confirmReturnOrder (
    name: String!
  ): ReturnOrder @priviledge(category: "order_customer", priviledge: "mutation")

  receiveReturnOrder (
    name: String!
  ): ReturnOrder @priviledge(category: "order_customer", priviledge: "mutation")

  rejectReturnOrder (
    name: String!
    patch: ReturnOrderPatch!
  ): ReturnOrder @priviledge(category: "order_customer", priviledge: "mutation")

  checkReturnOrder (
    name: String!
  ): ReturnOrder @priviledge(category: "order_customer", priviledge: "mutation")
`

export const Query = `
  returnOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ReturnOrderList
  returnOrder(name: String!): ReturnOrder

  returnOrderDetail (
    name: String!
  ): ReturnOrderDetail @priviledge(category: "order", priviledge: "query")

  returnOrderRequests (
    filters: [Filter],
    pagination: Pagination,
    sortings: [Sorting]
  ): ReturnOrderList @priviledge(category: "order_warehouse", priviledge: "query")
`

export const Types = [ReturnOrder, NewReturnOrder, ReturnOrderPatch, ReturnOrderList, ReturnOrderDetail]
