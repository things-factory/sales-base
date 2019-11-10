import gql from 'graphql-tag'

export const TransportOrderDetail = gql`
  type TransportOrderDetail {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    description: String
    type: String
    collectionOrder: CollectionOrder
    deliveryOrder: DeliveryOrder
    transportDriver: TransportDriver
    transportVehicle: TransportVehicle
    assignedLoad: Float
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
