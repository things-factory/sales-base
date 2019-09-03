import { gql } from 'apollo-server-koa'

export const ArrivalNotice = gql`
  type ArrivalNotice {
    id: String
    name: String
    domain: Domain
    description: String
    containerNo: String
    transportFlag: Boolean
    eta: String
    truckNo: String
    status: String
    collectionOrder: CollectionOrder
    deliveryOrder: DeliveryOrder
    creator: User
    updator: User
    createdAt: String
    updatedAt: String
  }
`
