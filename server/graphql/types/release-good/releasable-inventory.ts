import gql from 'graphql-tag'

export const ReleasableInventory = gql`
  type ReleasableInventory {
    batchId: String
    containerNo: String
    packingType: String
    releaseQty: Int
    releaseWeight: Float
    product: Product
  }
`
