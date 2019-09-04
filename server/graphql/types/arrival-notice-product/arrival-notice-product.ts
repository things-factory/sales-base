import { gql } from 'apollo-server-koa'

export const ArrivalNoticeProduct = gql`
  type ArrivalNoticeProduct {
    id: String
    name: String
    domain: Domain
    description: String
    product: Product
    arrivalNotice: ArrivalNotice
    seq: String
    batchId: String
    packingType: String
    unit: String
    weight: String
    packQty: String
    totalWeight: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
