import { gql } from 'apollo-server-koa'

export const OrderInventoryList = gql`
  type OrderInventoryList {
    items: [OrderInventory]
    total: Int
  }
`
