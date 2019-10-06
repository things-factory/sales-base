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
    refNo: String
    deliveryDate: String
    deliveryDateTime: String
    transportVehicle: TransportVehicle
    transportDriver: TransportDriver
    attachments: [Attachment]
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
