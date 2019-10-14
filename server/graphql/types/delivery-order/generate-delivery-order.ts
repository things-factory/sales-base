import { gql } from 'apollo-server-koa'

export const GenerateDeliveryOrder = gql`
  input GenerateDeliveryOrder {
    name: String
    from: String
    to: String
    truckNo: String
    loadWeight: Int
    urgency: Boolean
    cargoType: String
    refNo: String
    looseItem: Boolean
    deliveryDate: String!
    deliveryDateTime: String
    telNo: String
    status: String
    description: String
  }
`
