import { gql } from 'apollo-server-koa'

export const NewOrderProduct = gql`
  input NewOrderProduct {
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
    actualQty: Int
    palletQty: Int
    status: String
    totalWeight: String
  }
`
