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
    deliveryDate: String
    orderProducts: [OrderProduct]
    orderVass: [OrderVas]
    transportVehicle: TransportVehicle
    transportDriver: TransportDriver
    telNo: String
    remark: String
    status: String
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
