import { NewOrderProduct } from './new-order-product'
import { OrderProduct } from './order-product'
import { OrderProductList } from './order-product-list'
import { OrderProductPatch } from './order-product-patch'

export const Mutation = `
  createOrderProduct (
    orderProduct: NewOrderProduct!
  ): OrderProduct

  updateOrderProduct (
    name: String!
    patch: OrderProductPatch!
  ): OrderProduct

  updateMultipleOrderProduct (
    patches: [OrderProductPatch]!
  ): [OrderProduct]

  deleteOrderProduct (
    name: String!
  ): Boolean

  deleteOrderProducts (
    names: [String]!
  ): Boolean
`

export const Query = `
  orderProducts(filters: [Filter], pagination: Pagination, sortings: [Sorting]): OrderProductList
  orderProduct(arrivalNotice: ObjectRef, name: String!): OrderProduct
`

export const Types = [OrderProduct, NewOrderProduct, OrderProductPatch, OrderProductList]
