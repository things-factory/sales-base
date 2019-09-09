import { NewOrderVas } from './new-order-vas'
import { OrderVas } from './order-vas'
import { OrderVasList } from './order-vas-list'
import { OrderVasPatch } from './order-vas-patch'

export const Mutation = `
  createOrderVas (
    orderVas: NewOrderVas!
  ): OrderVas

  updateOrderVas (
    name: String!
    patch: OrderVasPatch!
  ): OrderVas

  updateMultipleOrderVas (
    patches: [OrderVasPatch]!
  ): [OrderVas]

  deleteOrderVas (
    name: String!
  ): Boolean

  deleteOrderVass (
    names: [String]!
  ): Boolean
`

export const Query = `
  orderVass(filters: [Filter], pagination: Pagination, sortings: [Sorting]): OrderVasList
  orderVas(arrivalNotice: ObjectRef!, name: String!): OrderVas
`

export const Types = [OrderVas, NewOrderVas, OrderVasPatch, OrderVasList]
