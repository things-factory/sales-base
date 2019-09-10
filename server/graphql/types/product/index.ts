import { NewProduct } from './new-product'
import { Product } from './product'
import { ProductList } from './product-list'
import { ProductPatch } from './product-patch'

export const Mutation = `
  createProduct (
    product: NewProduct!
  ): Product @priviledge(category: "order", priviledge: "mutation")

  updateProduct (
    name: String!
    patch: ProductPatch!
  ): Product @priviledge(category: "order", priviledge: "mutation")

  updateMultipleProduct (
    patches: [ProductPatch]!
  ): [Product] @priviledge(category: "order", priviledge: "mutation")

  deleteProduct (
    name: String!
  ): Boolean @priviledge(category: "order", priviledge: "mutation")

  deleteProducts (
    names: [String]!
  ): Boolean @priviledge(category: "order", priviledge: "mutation")
`

export const Query = `
  products(filters: [Filter], pagination: Pagination, sortings: [Sorting]): ProductList @priviledge(category: "order", priviledge: "query")
  product(name: String!): Product @priviledge(category: "order", priviledge: "query")
`

export const Types = [Product, NewProduct, ProductPatch, ProductList]
