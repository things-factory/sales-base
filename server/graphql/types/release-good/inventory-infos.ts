import gql from 'graphql-tag'

export const InventoryInfos = gql`
  type InventoryInfos {
    name: String
    batchId: String
    productIdRef: String
    productName: String
    product: Product
    packingType: String
    qty: Int
    weight: Float
    releaseQty: Float
    releaseWeight: Float
    inventoryName: String
    location: Location
  }
`
