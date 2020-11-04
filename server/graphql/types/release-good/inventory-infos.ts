import gql from 'graphql-tag'

export const InventoryInfos = gql`
  type InventoryInfos {
    id: String
    name: String
    batchId: String
    palletId: String
    productIdRef: String
    productName: String
    product: Product
    packingType: String
    qty: Int
    weight: Float
    releaseQty: Float
    releaseWeight: Float
    returnQty: Float
    returnWeight: Float
    inventoryName: String
    location: Location
    status: String
  }
`
