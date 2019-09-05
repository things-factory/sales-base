import { gql } from 'apollo-server-koa'

export const ArrivalNoticeProductPatch = gql`
  input ArrivalNoticeProductPatch {
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
    cuFlag: String
  }
`
