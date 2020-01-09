import gql from 'graphql-tag'

export const GenerateDeliveryOrder = gql`
  input GenerateDeliveryOrder {
    name: String
    from: String
    to: String
    loadWeight: Float
    urgency: Boolean
    cargoType: String
    ownCollection: Boolean
    truckNo: String
    refNo: String
    looseItem: Boolean
    deliveryDate: String!
    deliveryDateTime: String
    telNo: String
    status: String
    description: String
  }
`
