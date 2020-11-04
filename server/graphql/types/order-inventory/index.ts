import { OrderInventory } from './order-inventory'
import { NewOrderInventory } from './new-order-inventory'
import { OrderInventoryPatch } from './order-inventory-patch'
import { OrderInventoryList } from './order-inventory-list'

export const Mutation = `
  createOrderInventory (
    orderInventory: NewOrderInventory!
  ): OrderInventory

  updateOrderInventory (
    name: String!
    patch: OrderInventoryPatch!
  ): OrderInventory

  deleteOrderInventory (
    name: String!
  ): Boolean

  deleteOrderInventories (
    names: [String]!
  ): Boolean
`

export const Query = `
  orderInventories(filters: [Filter], pagination: Pagination, sortings: [Sorting]): OrderInventoryList
  orderInventory(name: String!): OrderInventory
  inventoriesByOrder(filters: [Filter], pagination: Pagination, sortings: [Sorting]): OrderInventoryList
`

export const Types = [OrderInventory, NewOrderInventory, OrderInventoryPatch, OrderInventoryList]
