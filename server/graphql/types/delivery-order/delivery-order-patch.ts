import { gql } from 'apollo-server-koa'

export const DeliveryOrderPatch = gql`
  input DeliveryOrderPatch {
    name: String
    truckNo: String
    loadType: String
    refNo: String
    from: String
    to: String
    deliveryDateTime: String
    orderProducts: [ObjectRef]!
    orderVass: [ObjectRef]
    telNo: String
    status: String
    description: String
    cuFlag: String
  }
`
