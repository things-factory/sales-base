import { InventoryInfos } from './inventory-infos'
import { NewReleaseGood } from './new-release-good'
import { ReleasableInventory } from './releasable-inventory'
import { ReleasableInventoryList } from './releasable-inventory-list'
import { ReleaseGood } from './release-good'
import { ReleaseGoodDetail } from './release-good-detail'
import { ShippingOrderInfo } from './shipping-order-info'
import { ReleaseGoodList } from './release-good-list'
import { ReleaseGoodPatch } from './release-good-patch'

export const Mutation = `
  createReleaseGood (
    releaseGood: NewReleaseGood!
  ): ReleaseGood @priviledge(category: "order_customer", priviledge: "mutation")

  updateReleaseGood (
    name: String!
    patch: ReleaseGoodPatch!
  ): ReleaseGood @priviledge(category: "order_customer", priviledge: "mutation")

  deleteReleaseGood (
    name: String!
  ): Boolean @priviledge(category: "order_customer", priviledge: "mutation")

  deleteReleaseGoods (
    names: [String]!
  ): Boolean @priviledge(category: "order_customer", priviledge: "mutation")

  generateReleaseGood (
    releaseGood: NewReleaseGood
    shippingOrder: ShippingOrderPatch
  ): ReleaseGood @priviledge(category: "order_customer", priviledge: "mutation")

  confirmReleaseGood (
    name: String!
  ): ReleaseGood @priviledge(category: "order_customer", priviledge: "mutation")

  checkReleaseGood (
    name: String!
  ): ReleaseGood @priviledge(category: "order_warehouse", priviledge: "mutation")

  rejectReleaseGood (
    name: String!
    patch: ReleaseGoodPatch!
  ): ReleaseGood @priviledge(category: "order_warehouse", priviledge: "mutation")

  deliverReleaseGood (
    name: String!
  ): ReleaseGood  @priviledge(category: "order_warehouse", priviledge: "mutation")
`

export const Query = `
  releaseGoods (
    filters: [Filter],
    pagination: Pagination,
    sortings: [Sorting]
  ): ReleaseGoodList @priviledge(category: "order_customer", priviledge: "query")

  releaseGood (
    name: String!
  ): ReleaseGood @priviledge(category: "order", priviledge: "query")

  releaseGoodDetail (
    name: String!
  ): ReleaseGoodDetail @priviledge(category: "order", priviledge: "query")

  releaseGoodRequests (
    filters: [Filter],
    pagination: Pagination,
    sortings: [Sorting]
  ): ReleaseGoodList @priviledge(category: "order_warehouse", priviledge: "query")

  releasableInventories (
    filters: [Filter],
    pagination: Pagination,
    sortings: [Sorting]
  ): ReleasableInventoryList @priviledge(category: "order", priviledge: "query")
`

export const Types = [
  ReleaseGood,
  NewReleaseGood,
  ReleaseGoodPatch,
  ReleaseGoodList,
  ReleaseGoodDetail,
  ShippingOrderInfo,
  InventoryInfos,
  ReleasableInventory,
  ReleasableInventoryList
]
