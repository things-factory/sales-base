import { gql } from 'apollo-server-koa'

export const NewTransportOrderDetail = gql`
  input NewTransportOrderDetail {
    name: String!
    description: String
    collectionOrder: ObjectRef
    deliveryOrder: ObjectRef
    transportDriver: ObjectRef
    transportVehicle: ObjectRef
    type: String
  }
`
