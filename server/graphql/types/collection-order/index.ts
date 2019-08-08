import { CollectionOrder } from './collection-order'
import { NewCollectionOrder } from './new-collection-order'
import { CollectionOrderPatch } from './collection-order-patch'
import { CollectionOrderList } from './collection-order-list'
import { Filter, Pagination, Sorting } from '@things-factory/shell'

export const Mutation = `
  createCollectionOrder (
    collectionOrder: NewCollectionOrder!
  ): CollectionOrder

  updateCollectionOrder (
    id: String!
    patch: CollectionOrderPatch!
  ): CollectionOrder

  deleteCollectionOrder (
    id: String!
  ): CollectionOrder
`

export const Query = `
  collectionOrders(filters: [Filter], pagination: Pagination, sortings: [Sorting]): CollectionOrderList
  collectionOrder(id: String!): CollectionOrder
`

export const Types = [Filter, Pagination, Sorting, CollectionOrder, NewCollectionOrder, CollectionOrderPatch, CollectionOrderList]
