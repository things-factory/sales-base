import { gql } from 'apollo-server-koa'

export const GenerateDeliveryOrder = gql`
  input GenerateDeliveryOrder {
    name: String
    from: String
    to: String
    truckNo: String
    loadWeight: Float
    urgency: Boolean
    cargoType: String
    otherCargoType: String
    refNo: String
    deliveryDate: String!
    deliveryDateTime: String
    telNo: String
    status: String
    description: String
  }
`
