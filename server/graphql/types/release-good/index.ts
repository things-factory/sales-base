import { ReleaseGood } from './release-good'
import { NewReleaseGood } from './new-release-good'
import { ReleaseGoodPatch } from './release-good-patch'
import { ReleaseGoodList } from './release-good-list'
import { ReleaseGoodDetail } from './release-good-detail'
import { ShippingOrderInfo } from './shipping-order-info'
import { InventoryInfos } from './inventory-infos'

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
  ): ReleaseGood

  confirmReleaseGood (
    name: String!
  ): ReleaseGood

  checkReleaseGood (
    name: String!
  ): ReleaseGood

  rejectReleaseGood (
    name: String!
    patch: ReleaseGoodPatch!
  ): ReleaseGood

  deliverReleaseGood (
    name: String!
  ): ReleaseGood
`

export const Query = `
  releaseGoods(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ReleaseGoodList
  releaseGood(name: String!): ReleaseGood
  releaseGoodDetail(name: String!): ReleaseGoodDetail
  releaseGoodRequests(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ReleaseGoodList
`

export const Types = [
  ReleaseGood,
  NewReleaseGood,
  ReleaseGoodPatch,
  ReleaseGoodList,
  ReleaseGoodDetail,
  ShippingOrderInfo,
  InventoryInfos
]
