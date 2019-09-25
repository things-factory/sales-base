import { gql } from 'apollo-server-koa'

export const OrderProductPatch = gql`
  input OrderProductPatch {
    id: String
    name: String
    product: ObjectRef
    arrivalNotice: ObjectRef
    batchId: String
    packingType: String
    unit: String
    weight: Float
    packQty: Int
    actualQty: Int
    palletQty: Int
    actualPalletQty: Int
    totalWeight: String
    description: String
    status: String
    cuFlag: String
  }
`
