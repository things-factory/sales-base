import { gql } from 'apollo-server-koa'

export const DeliveryOrderPatch = gql`
  input DeliveryOrderPatch {
    id: String
    name: String
    truckNo: String
    loadType: String
    from: String
    to: String
    deliveryDateTime: String
    orderProducts: [ObjectRef]
    transportVehicle: ObjectRef
    transportDriver: ObjectRef
    orderVass: [ObjectRef]
    telNo: String
    status: String
    description: String
  }
`
