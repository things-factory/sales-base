import { ProductBatch } from './product-batch'
import { NewProductBatch } from './new-product-batch'
import { ProductBatchPatch } from './product-batch-patch'
import { ProductBatchList } from './product-batch-list'
import { Filter, Pagination, Sorting } from '@things-factory/shell'

export const Mutation = `
  createProductBatch (
    productBatch: NewProductBatch!
  ): ProductBatch

  updateProductBatch (
    id: String!
    patch: ProductBatchPatch!
  ): ProductBatch

  deleteProductBatch (
    id: String!
  ): ProductBatch
`

export const Query = `
  productBatches(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ProductBatchList
  productBatch(id: String!): ProductBatch
`

export const Types = [Filter, Pagination, Sorting, ProductBatch, NewProductBatch, ProductBatchPatch, ProductBatchList]
