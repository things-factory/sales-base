import gql from 'graphql-tag'

export const TransportOrderDetailPatch = gql`
  input TransportOrderDetailPatch {
    name: String
    type: String
    description: String
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
    transportDriver: ObjectRef
    transportVehicle: ObjectRef
    assignedLoad: Float
  }
`
