import gql from 'graphql-tag'

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
    deliveryDate: String
    deliveryDateTime: String
    looseItem: Boolean
    transportDriver: ObjectRef
    transportVehicle: ObjectRef
    remark: String
    telNo: String
    status: String
    description: String
  }
`
