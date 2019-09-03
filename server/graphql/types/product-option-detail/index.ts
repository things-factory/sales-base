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

  updateMultipleProductOptionDetail (
    patches: [ProductOptionDetailPatch]!
  ): [ProductOptionDetail]

  deleteProductOptionDetail (
    name: String!
  ): Boolean

  deleteProductOptionDetails (
    names: [String]!
  ): Boolean
`

export const Query = `
  productOptionDetails(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ProductOptionDetailList
  productOptionDetail(name: String!): ProductOptionDetail
`

export const Types = [ProductOptionDetail, NewProductOptionDetail, ProductOptionDetailPatch, ProductOptionDetailList]
