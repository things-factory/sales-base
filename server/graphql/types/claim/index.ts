import { Claim } from './claim'
import { NewClaim } from './new-claim'
import { ClaimPatch } from './claim-patch'
import { ClaimList } from './claim-list'

export const Mutation = `
  createClaim (
    claim: NewClaim!
  ): Claim @priviledge(category: "claim", priviledge: "mutation" )

  updateClaim (
    id: String!
    patch: ClaimPatch!
  ): Claim

  updateMultipleClaim (
    patches: [ClaimPatch]!
  ): [Claim]

  deleteClaim (
    name: String!
  ): Boolean

  deleteClaims (
    names: [String]!
  ): Boolean
`

export const Query = `
  claims(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ClaimList
  claim(id: String!): Claim
  claimOrderList(transportDriver: String, transportVehicle: String): [Claim]
  claimOrderDetail(filters: [Filter]): Claim
`

export const Types = [Claim, NewClaim, ClaimPatch, ClaimList]
