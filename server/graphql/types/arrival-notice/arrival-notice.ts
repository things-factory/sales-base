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
    collectionDateTime: String
    from: String
    truckNo: String
    loadType: String
    status: String
    orderProducts: [OrderProduct]
    orderVass: [OrderVas]
    collectionOrder: CollectionOrder
    deliveryOrderNo: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
