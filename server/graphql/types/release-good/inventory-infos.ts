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
    stdUnit: String
    weight: Float
    stdUnitValue: Float
    releaseQty: Float
    releaseWeight: Float
    releaseStdUnitValue: Float
    returnQty: Float
    returnWeight: Float
    returnStdUnitValue: Float
    inventoryName: String
    location: Location
    status: String
  }
`
