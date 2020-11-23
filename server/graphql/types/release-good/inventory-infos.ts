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
    uom: String
    weight: Float
    uomValue: Float
    releaseQty: Float
    releaseWeight: Float
    releaseUomValue: Float
    returnQty: Float
    returnWeight: Float
    returnUomValue: Float
    inventoryName: String
    location: Location
    remark: String
    status: String
  }
`
