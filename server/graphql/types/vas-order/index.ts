import { VasOrder } from './vas-order'
import { NewVasOrder } from './new-vas-order'
import { VasOrderPatch } from './vas-order-patch'
import { VasOrderList } from './vas-order-list'
import { InventoryDetail } from './inventory-detail'

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

  editVasOrder (
    name: String!
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

export const Types = [VasOrder, NewVasOrder, VasOrderPatch, VasOrderList, InventoryDetail]
