import { gql } from 'apollo-server-koa'

export const VasOrder = gql`
  type VasOrder {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    description: String
    orderVass: [OrderVas]
    status: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
    inventoryDetail: [InventoryDetail]
  }
`
