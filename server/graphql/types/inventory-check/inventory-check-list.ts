import gql from 'graphql-tag'

export const InventoryCheckList = gql`
  type InventoryCheckList {
    items: [InventoryCheck]
    total: Int
  }
`
