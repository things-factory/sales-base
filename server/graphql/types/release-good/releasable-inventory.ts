import gql from 'graphql-tag'

export const ReleasableInventory = gql`
  type ReleasableInventory {
    batchId: String
    containerNo: String
    packingType: String
    remainQty: Int
    remainWeight: Float
    remainUomValue: Float
    product: Product
    productName: String
  }
`
