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
    palletQty: Int
    totalWeight: String
    description: String
    status: String
    cuFlag: String
  }
`
