import { gql } from 'apollo-server-koa'

export const NewArrivalNoticeProduct = gql`
  input NewArrivalNoticeProduct {
    name: String!
    description: String
    product: ObjectRef
    arrivalNotice: ObjectRef
    seq: String!
    batchId: String
    packingType: String
    unit: String
    weight: String
    packQty: String
    totalWeight: String
  }
`
