import gql from 'graphql-tag'

export const InventoryCheck = gql`
  type InventoryCheck {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    executionDate: String
    type: String
    status: String
    orderInventory: [OrderInventory]
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
