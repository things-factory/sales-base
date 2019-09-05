import { gql } from 'apollo-server-koa'

export const NewArrivalNoticeProduct = gql`
  input NewArrivalNoticeProduct {
    name: String
    description: String
    product: ObjectRef
    arrivalNotice: ObjectRef
    seq: Int!
    batchId: String
    packingType: String
    unit: String
    weight: Float
    packQty: Int
    palletQty: Int
    totalWeight: String
  }
`
