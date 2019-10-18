import { ClaimOrder } from './claim-order'
import { NewClaimOrder } from './new-claim-order'
import { ClaimOrderPatch } from './claim-order-patch'
import { ClaimOrderList } from './claim-order-list'

export const Mutation = `
  createClaimOrder (
    claimOrder: NewClaimOrder!
  ): ClaimOrder

  updateClaimOrder (
    name: String!
    patch: ClaimOrderPatch!
  ): ClaimOrder

  updateMultipleClaimOrder (
    patches: [ClaimOrderPatch]!
  ): [ClaimOrder]

  deleteClaimOrder (
    name: String!
  ): Boolean

  deleteClaimOrders (
    names: [String]!
  ): Boolean
`

export const Query = `
  claimOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ClaimOrderList
  claimOrder(name: String!): ClaimOrder
`

export const Types = [ClaimOrder, NewClaimOrder, ClaimOrderPatch, ClaimOrderList]
