import gql from 'graphql-tag'

export const OrderInventoryList = gql`
  type OrderInventoryList {
    items: [OrderInventory]
    total: Int
  }
`
