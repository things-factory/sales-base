import gql from 'graphql-tag'

export const ReleasableInventoryList = gql`
  type ReleasableInventoryList {
    items: [ReleasableInventory]
    total: Int
  }
`
