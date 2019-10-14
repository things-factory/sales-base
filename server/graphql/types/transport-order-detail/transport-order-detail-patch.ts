import { gql } from 'apollo-server-koa'

export const TransportOrderDetailPatch = gql`
  input TransportOrderDetailPatch {
    id: String
    name: String
    type: String
    description: String
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
    transportDriver: ObjectRef
    transportVehicle: ObjectRef
  }
`
