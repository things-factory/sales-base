import { ReleaseGood } from './release-good'
import { NewReleaseGood } from './new-release-good'
import { ReleaseGoodPatch } from './release-good-patch'
import { ReleaseGoodList } from './release-good-list'

export const Mutation = `
  createReleaseGood (
    releaseGood: NewReleaseGood!
  ): ReleaseGood

  updateReleaseGood (
    name: String!
    patch: ReleaseGoodPatch!
  ): ReleaseGood

  deleteReleaseGood (
    name: String!
  ): Boolean

  deleteReleaseGoods (
    names: [String]!
  ): Boolean

  generateReleaseGood (
    releaseGood: NewReleaseGood
    shippingOrder: ShippingOrderPatch
    deliveryOrder: DeliveryOrderPatch
  ): ReleaseGood

  editReleaseGood (
    name: String!
    releaseGood: NewReleaseGood!
  ): ReleaseGood

  confirmReleaseGood (
    name: String!
  ): ReleaseGood

  receiveReleaseGood (
    name: String!
  ): ReleaseGood

  checkReleaseGood (
    name: String!
  ): ReleaseGood

  rejectReleaseGood (
    name: String!
    patch: ReleaseGoodPatch!
  ): ReleaseGood

  executeReleaseGood (
    name: String!
  ): ReleaseGood
`

export const Query = `
  releaseGoods(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ReleaseGoodList
  releaseGood(name: String!): ReleaseGood
  releaseGoodRequests(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ReleaseGoodList
`

export const Types = [ReleaseGood, NewReleaseGood, ReleaseGoodPatch, ReleaseGoodList]
