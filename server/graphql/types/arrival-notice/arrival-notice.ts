import { gql } from 'apollo-server-koa'

export const ArrivalNotice = gql`
  type ArrivalNotice {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    description: String
    containerNo: String
    ownTransport: Boolean
    eta: String
    truckNo: String
    status: String
    arrivalNoticeProducts: [ArrivalNoticeProduct]
    arrivalNoticeVass: [ArrivalNoticeVas]
    collectionOrder: CollectionOrder
    deliveryOrder: DeliveryOrder
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
