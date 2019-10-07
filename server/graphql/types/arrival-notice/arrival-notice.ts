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
    etaDate: String
    from: String
    to: String
    truckNo: String
    status: String
    remark: String
    orderProducts: [OrderProduct]
    orderVass: [OrderVas]
    collectionOrder: CollectionOrder
    attachment: Attachment
    deliveryOrderNo: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
