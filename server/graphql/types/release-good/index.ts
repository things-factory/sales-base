import { InventoryInfos } from './inventory-infos'
import { NewReleaseGood } from './new-release-good'
import { ReleasableInventory } from './releasable-inventory'
import { ReleasableInventoryList } from './releasable-inventory-list'
import { ReleaseGood } from './release-good'
import { ReleaseGoodDetail } from './release-good-detail'
import { ShippingOrderInfo } from './shipping-order-info'
// import { ReleaseGoodInfo } from './release-good-info'
import { ReleaseGoodList } from './release-good-list'
import { ReleaseGoodPatch } from './release-good-patch'

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
  releasableInventories(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ReleasableInventoryList
`

export const Types = [
  ReleaseGood,
  NewReleaseGood,
  ReleaseGoodPatch,
  ReleaseGoodList,
  ReleaseGoodDetail,
  ShippingOrderInfo,
  // ReleaseGoodInfo,
  InventoryInfos,
  ReleasableInventory,
  ReleasableInventoryList
]
