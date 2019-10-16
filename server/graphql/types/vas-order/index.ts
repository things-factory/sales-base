import { NewVasOrder } from './new-vas-order'
import { VasOrder } from './vas-order'
import { VasOrderList } from './vas-order-list'
import { VasOrderPatch } from './vas-order-patch'

export const Mutation = `
  createVasOrder (
    vasOrder: NewVasOrder!
  ): VasOrder

  updateVasOrder (
    name: String!
    patch: VasOrderPatch!
  ): VasOrder

  deleteVasOrder (
    name: String!
  ): Boolean

  deleteVasOrders (
    names: [String]!
  ): Boolean

  generateVasOrder (
    vasOrder: NewVasOrder!
  ): VasOrder

  confirmVasOrder (
    name: String!
  ): VasOrder

  checkVasOrder (
    name: String!
  ): VasOrder

  rejectVasOrder (
    name: String!
    patch: VasOrderPatch!
  ): VasOrder
`

export const Query = `
  vasOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): VasOrderList
  vasOrder(name: String!): VasOrder
  vasOrderRequests(filters: [Filter], pagination: Pagination, sortings: [Sorting]): VasOrderList
`

export const Types = [VasOrder, NewVasOrder, VasOrderPatch, VasOrderList]
