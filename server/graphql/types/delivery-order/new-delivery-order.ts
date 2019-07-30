import { gql } from 'apollo-server-koa'

export const NewDeliveryOrder = gql`
  input NewDeliveryOrder {
    name: String!
    type: String!
    issuedOn: String!
    state: String
    customer: String
    transportOrder: String
    description: String
  }
`
