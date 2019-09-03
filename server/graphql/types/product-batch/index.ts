import { NewProductBatch } from './new-product-batch'
import { ProductBatch } from './product-batch'
import { ProductBatchList } from './product-batch-list'
import { ProductBatchPatch } from './product-batch-patch'

export const Mutation = `
  createProductBatch (
    productBatch: NewProductBatch!
  ): ProductBatch

  updateProductBatch (
    name: String!
    patch: ProductBatchPatch!
  ): ProductBatch

  deleteProductBatch (
    name: String!
  ): Boolean
`

export const Query = `
  productBatches(filters: [Filter], pagination: Pagination, sortings: [Sorting])  : ProductBatchList
  productBatch(name: String!): ProductBatch
`

export const Types = [ProductBatch, NewProductBatch, ProductBatchPatch, ProductBatchList]
