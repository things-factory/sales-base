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
    pickingDateTime: String
    from: String
    truckNo: String
    loadType: String
    status: String
    arrivalNoticeProducts: [ArrivalNoticeProduct]
    arrivalNoticeVass: [ArrivalNoticeVas]
    collectionOrder: CollectionOrder
    deliveryOrderNo: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
