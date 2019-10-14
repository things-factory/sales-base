import { gql } from 'apollo-server-koa'

export const DeliveryOrderPatch = gql`
  input DeliveryOrderPatch {
    id: String
    name: String
    truckNo: String
    from: String
    to: String
    refNo: String
    loadWeight: Int
    urgency: Boolean
    cargoType: String
    deliveryDate: String
    deliveryDateTime: String
    looseItem: Boolean
    transportOrderDetails: [ObjectRef]
    remark: String
    telNo: String
    status: String
    description: String
  }
`
