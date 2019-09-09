import { gql } from 'apollo-server-koa'

export const DeliveryOrder = gql`
  type DeliveryOrder {
    id: String
    domain: Domain
    bizplace: Bizplace
    name: String
    loadType: String
    truckNo: String
    from: String
    to: String
    deliveryDateTime: Date
    orderProducts: [OrderProduct]
    orderVass: [OrderVas]
    status: String
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
