import { CollectionOrder } from './collection-order'
import { CollectionOrderList } from './collection-order-list'
import { CollectionOrderPatch } from './collection-order-patch'
import { NewCollectionOrder } from './new-collection-order'

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
`

export const Query = `
  collectionOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): CollectionOrderList
  collectionOrder(name: String!): CollectionOrder
`

export const Types = [CollectionOrder, NewCollectionOrder, CollectionOrderPatch, CollectionOrderList]
