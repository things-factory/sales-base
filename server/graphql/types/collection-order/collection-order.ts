import gql from 'graphql-tag'

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
    loadWeight: Float
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
