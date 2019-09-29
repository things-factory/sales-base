import { gql } from 'apollo-server-koa'

export const InventoryInfos = gql`
  type InventoryInfos {
    name: String
    batchId: String
    product: Product
    packingType: String
    qty: Int
    releaseQty: Int
    inventoryName: String
    location: Location
  }
`
