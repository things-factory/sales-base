import { CollectionOrder } from './collection-order'
import { CollectionOrderList } from './collection-order-list'
import { CollectionOrderPatch } from './collection-order-patch'
import { NewCollectionOrder } from './new-collection-order'
import { GenerateCollectionOrder } from './generate-collection-order'

export const Mutation = `
  createCollectionOrder (
    collectionOrder: NewCollectionOrder!
  ): CollectionOrder

  updateCollectionOrder (
    name: String!
    patch: CollectionOrderPatch!
  ): CollectionOrder

  deleteCollectionOrder (
    name: String!
  ): Boolean

  generateCollectionOrder (
    collectionOrder: GenerateCollectionOrder!
  ): CollectionOrder

  editCollectionOrder (
    name: String!
    collectionOrder: GenerateCollectionOrder!
  ): CollectionOrder

  confirmCollectionOrder (
    name: String!
  ): CollectionOrder

  receiveCollectionOrder (
    name: String!
    patch: CollectionOrderPatch!
  ): CollectionOrder

  checkCollectedOrder (
    name: String!
  ): CollectionOrder

  dispatchCollectionOrder (
    name: String!
    patch: CollectionOrderPatch
  ): CollectionOrder

  rejectCollectionOrder (
    name: String!
    patch: CollectionOrderPatch!
  ): CollectionOrder
`

export const Query = `
  collectionOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): CollectionOrderList
  collectionOrder(name: String!): CollectionOrder
  collectionOrderRequests(filters: [Filter], pagination: Pagination, sortings: [Sorting]): CollectionOrderList
`

export const Types = [
  CollectionOrder,
  NewCollectionOrder,
  CollectionOrderPatch,
  CollectionOrderList,
  GenerateCollectionOrder
]
