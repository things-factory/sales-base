import { gql } from 'apollo-server-koa'

export const DeliveryOrderPatch = gql`
  input DeliveryOrderPatch {
    id: String
    name: String
    truckNo: String
    loadType: String
    from: String
    to: String
    deliveryDate: String
    orderProducts: [ObjectRef]
    transportVehicle: ObjectRef
    transportDriver: ObjectRef
    orderVass: [ObjectRef]
    remark: String
    telNo: String
    status: String
    description: String
  }
`
