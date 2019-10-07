import { gql } from 'apollo-server-koa'

export const DeliveryOrderPatch = gql`
  input DeliveryOrderPatch {
    id: String
    name: String
    truckNo: String
    from: String
    to: String
    refNo: String
    loadWeight: Float
    urgency: Boolean
    cargoType: String
    otherCargoType: String
    deliveryDate: String
    deliveryDateTime: String
    transportVehicle: ObjectRef
    transportDriver: ObjectRef
    remark: String
    telNo: String
    status: String
    description: String
  }
`
