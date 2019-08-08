import { Product } from './product'
import { NewProduct } from './new-product'
import { ProductPatch } from './product-patch'
import { ProductList } from './product-list'
import { Filter, Pagination, Sorting } from '@things-factory/shell'

export const Mutation = `
  createProduct (
    product: NewProduct!
  ): Product

  updateProduct (
    id: String!
    patch: ProductPatch!
  ): Product

  deleteProduct (
    id: String!
  ): Product
`

export const Query = `
  products(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ProductList
  product(id: String!): Product
`

export const Types = [Filter, Pagination, Sorting, Product, NewProduct, ProductPatch, ProductList]
