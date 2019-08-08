import { Filter, Pagination, Sorting } from '@things-factory/shell'
import { NewProductOption } from './new-product-option'
import { ProductOption } from './product-option'
import { ProductOptionList } from './product-option-list'
import { ProductOptionPatch } from './product-option-patch'

export const Mutation = `
  createProductOption (
    productOption: NewProductOption!
  ): ProductOption

  updateProductOption (
    id: String!
    patch: ProductOptionPatch!
  ): ProductOption

  deleteProductOption (
    id: String!
  ): ProductOption
`

export const Query = `
  productOptions(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ProductOptionList
  productOption(id: String!): ProductOption
`

export const Types = [
  Filter,
  Pagination,
  Sorting,
  ProductOption,
  NewProductOption,
  ProductOptionPatch,
  ProductOptionList
]
