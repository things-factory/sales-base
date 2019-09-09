import { gql } from 'apollo-server-koa'

export const DeliveryOrderPatch = gql`
  input DeliveryOrderPatch {
    name: String
    truckNo: String
    loadType: String
    from: String
    to: String
    deliveryDateTime: Date
    orderProducts: [ObjectRef]!
    orderVass: [ObjectRef]
    status: String
    description: String
    cuFlag: String
  }
`
