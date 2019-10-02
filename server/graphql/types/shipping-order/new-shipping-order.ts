import { gql } from 'apollo-server-koa'

export const NewShippingOrder = gql`
  input NewShippingOrder {
    name: String
    shipName: String!
    containerNo: String!
    containerArrivalDate: String
    containerLeavingDate: String
    containerArrivalDateTime: Date
    containerLeavingDateTime: Date
    status: String!
    description: String
  }
`
