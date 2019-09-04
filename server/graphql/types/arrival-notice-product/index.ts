import { ArrivalNoticeProduct } from './arrival-notice-product'
import { NewArrivalNoticeProduct } from './new-arrival-notice-product'
import { ArrivalNoticeProductPatch } from './arrival-notice-product-patch'
import { ArrivalNoticeProductList } from './arrival-notice-product-list'

export const Mutation = `
  createArrivalNoticeProduct (
    arrivalNoticeProduct: NewArrivalNoticeProduct!
  ): ArrivalNoticeProduct

  updateArrivalNoticeProduct (
    name: String!
    patch: ArrivalNoticeProductPatch!
  ): ArrivalNoticeProduct

  updateMultipleArrivalNoticeProduct (
    patches: [ArrivalNoticeProductPatch]!
  ): [ArrivalNoticeProduct]

  deleteArrivalNoticeProduct (
    name: String!
  ): Boolean

  deleteArrivalNoticeProducts (
    names: [String]!
  ): Boolean
`

export const Query = `
  arrivalNoticeProducts(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ArrivalNoticeProductList
  arrivalNoticeProduct(arrivalNotice: ObjectRef, name: String!): ArrivalNoticeProduct
`

export const Types = [
  ArrivalNoticeProduct,
  NewArrivalNoticeProduct,
  ArrivalNoticeProductPatch,
  ArrivalNoticeProductList
]
