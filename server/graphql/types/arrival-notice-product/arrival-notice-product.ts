import { gql } from 'apollo-server-koa'

export const ArrivalNoticeProduct = gql`
  type ArrivalNoticeProduct {
    id: String
    name: String
    domain: Domain
    description: String
    product: Product
    arrivalNotice: ArrivalNotice
    seq: Int
    batchId: String
    packingType: String
    unit: String
    weight: Float
    packQty: Int
    palletQty: Int
    totalWeight: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
