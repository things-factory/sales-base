import { gql } from 'apollo-server-koa'

export const InventoryDetail = gql`
  type InventoryDetail {
    inventoryId: String
    vas: Vas
    batchId: String
    product: Product
    name: String
    location: Location
    remark: String
  }
`
