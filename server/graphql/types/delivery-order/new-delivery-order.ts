import { gql } from 'apollo-server-koa'

export const NewDeliveryOrder = gql`
  input NewDeliveryOrder {
    name: String
    from: String
    to: String
    truckNo: String
    refNo: String
    deliveryDate: String
    deliveryDateTime: String
    looseItem: Boolean
    telNo: String
    loadWeight: Int
    urgency: Boolean
    cargoType: String
    status: String!
    description: String
  }
`
