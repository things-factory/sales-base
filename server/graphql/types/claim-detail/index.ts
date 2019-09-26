import { ClaimDetail } from './claim-detail'
import { NewClaimDetail } from './new-claim-detail'
import { ClaimDetailPatch } from './claim-detail-patch'
import { ClaimDetailList } from './claim-detail-list'

export const Mutation = `
  createClaimDetail (
    claimDetail: NewClaimDetail!
  ): ClaimDetail

  updateClaimDetail (
    name: String!
    patch: ClaimDetailPatch!
  ): ClaimDetail

  updateMultipleClaimDetail (
    patches: [ClaimDetailPatch]!
  ): [ClaimDetail]

  deleteClaimDetail (
    name: String!
  ): Boolean

  deleteClaimDetails (
    names: [String]!
  ): Boolean
`

export const Query = `
  claimDetails(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ClaimDetailList
  claimDetail(name: String!): ClaimDetail
`

export const Types = [ClaimDetail, NewClaimDetail, ClaimDetailPatch, ClaimDetailList]
