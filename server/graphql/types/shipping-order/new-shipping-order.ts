import { gql } from 'apollo-server-koa'

export const NewShippingOrder = gql`
  input NewShippingOrder {
    name: String
    shipName: String!
    containerNo: String!
    containerArrivalDate: String
    containerLeavingDate: String
    from: String
    to: String
    status: String!
    loadType: String
    description: String
  }
`
