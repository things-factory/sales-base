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
    weight: String
    packQty: String
    totalWeight: String
    description: String
    cuFlag: String
  }
`
