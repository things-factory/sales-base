import gql from 'graphql-tag'

export const InventoryInfos = gql`
  type InventoryInfos {
    name: String
    batchId: String
    productName: String
    product: Product
    packingType: String
    qty: Int
    weight: Float
    releaseQty: Int
    releaseWeight: Float
    inventoryName: String
    location: Location
  }
`
