import gql from 'graphql-tag'

export const NewDeliveryOrder = gql`
  input NewDeliveryOrder {
    name: String
    from: String
    to: String
    refNo: String
    deliveryDate: String
    deliveryDateTime: String
    looseItem: Boolean
    telNo: String
    loadWeight: Float
    loadUomValue: Float
    urgency: Boolean
    cargoType: String
    status: String!
    description: String
  }
`
