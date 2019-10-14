import { gql } from 'apollo-server-koa'

export const CollectionOrder = gql`
  type CollectionOrder {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    from: String
    to: String
    truckNo: String
    refNo: String
    arrivalNotice: ArrivalNotice
    transportOrderDetails: [TransportOrderDetail]
    collectionDateTime: String
    collectionDate: String
    loadWeight: Int
    urgency: Boolean
    looseItem: Boolean
    cargoType: String
    attachments: [Attachment]
    remark: String
    telNo: String
    status: String
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
