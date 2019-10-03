import { gql } from 'apollo-server-koa'

export const GenerateDeliveryOrder = gql`
  input GenerateDeliveryOrder {
    name: String
    from: String
    to: String
    truckNo: String
    refNo: String
    deliveryDate: String!
    deliveryDateTime: String
    telNo: String
    loadType: String!
    status: String
    description: String
  }
`
