import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { NewProductOptionDetail } from './new-product-option-detail'
import { ProductOptionDetail } from './product-option-detail'
import { ProductOptionDetailList } from './product-option-detail-list'
import { ProductOptionDetailPatch } from './product-option-detail-patch'

export const Mutation = `
  createProductOptionDetail (
    productOptionDetail: NewProductOptionDetail!
  ): ProductOptionDetail

  updateProductOptionDetail (
    name: String!
    patch: ProductOptionDetailPatch!
  ): ProductOptionDetail

  deleteProductOptionDetail (
    name: String!
  ): ProductOptionDetail
`

export const Query = `
  productOptionDetails(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ProductOptionDetailList
  productOptionDetail(name: String!): ProductOptionDetail
`

export const Types = [
  Filter,
  Pagination,
  Sorting,
  ProductOptionDetail,
  NewProductOptionDetail,
  ProductOptionDetailPatch,
  ProductOptionDetailList
]
