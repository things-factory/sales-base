import gql from 'graphql-tag'

export const DeliveryOrder = gql`
  type DeliveryOrder {
    id: String
    domain: Domain
    bizplace: Bizplace
    releaseGood: ReleaseGood
    name: String
    loadWeight: Float
    urgency: Boolean
    cargoType: String
    from: String
    to: String
    refNo: String
    deliveryDate: String
    deliveryDateTime: String
    looseItem: Boolean
    transportDriver: TransportDriver
    transportVehicle: TransportVehicle
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
