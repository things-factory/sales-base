import gql from 'graphql-tag'

export const NewTransportOrderDetail = gql`
  input NewTransportOrderDetail {
    id: String
    name: String
    description: String
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
    transportDriver: ObjectRef
    transportVehicle: ObjectRef
    type: String
    assignedLoad: Float
  }
`
