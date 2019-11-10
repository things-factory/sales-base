import gql from 'graphql-tag'

export const ArrivalNotice = gql`
  type ArrivalNotice {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    description: String
    containerNo: String
    ownTransport: Boolean
    importCargo: Boolean
    eta: String
    etaDate: String
    truckNo: String
    status: String
    remark: String
    orderProducts: [OrderProduct]
    orderVass: [OrderVas]
    collectionOrders: [CollectionOrder]
    attachment: Attachment
    deliveryOrderNo: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
