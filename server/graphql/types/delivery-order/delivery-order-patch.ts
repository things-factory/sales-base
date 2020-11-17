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
    loadStdUnitValue: Float
    contactName: String
    urgency: Boolean
    ownCollection: Boolean
    contactPoint: String
    cargoType: String
    otherDriver: String
    ownDriver: String
    otherTruck: String
    ownTruck: String
    otherDestination: String
    deliveryDate: String
    deliveryDateTime: String
    looseItem: Boolean
    transportDriver: ObjectRef
    transportVehicle: ObjectRef
    driverName: String
    remark: String
    telNo: String
    status: String
    reusablePallet: String
    description: String
  }
`
