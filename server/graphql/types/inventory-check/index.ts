import { InventoryCheck } from './inventory-check'
import { NewInventoryCheck } from './new-inventory-check'
import { InventoryCheckPatch } from './inventory-check-patch'
import { InventoryCheckList } from './inventory-check-list'

export const Mutation = /* GraphQL */ `
  createInventoryCheck (
    inventoryCheck: NewInventoryCheck!
  ): InventoryCheck

  updateInventoryCheck (
    name: String!
    patch: InventoryCheckPatch!
  ): InventoryCheck

  generateCycleCount (
    executionDate: String!
    customerId: String!
  ): InventoryCheck

  updateMultipleInventoryCheck (
    patches: [InventoryCheckPatch]!
  ): [InventoryCheck]

  deleteInventoryCheck (
    name: String!
  ): Boolean

  deleteInventoryChecks (
    names: [String]!
  ): Boolean
`

export const Query = `
  inventoryChecks(filters: [Filter], pagination: Pagination, sortings: [Sorting]): InventoryCheckList
  inventoryCheck(name: String!): InventoryCheck
`

export const Types = [InventoryCheck, NewInventoryCheck, InventoryCheckPatch, InventoryCheckList]
