import { gql } from 'apollo-server-koa'

export const InventoryDetail = gql`
  type InventoryDetail {
    batchId: String
    product: Product
    inventoryName: String
    location: Location
  }
`
