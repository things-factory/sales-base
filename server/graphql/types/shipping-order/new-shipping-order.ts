import { gql } from 'apollo-server-koa'

export const NewShippingOrder = gql`
  input NewShippingOrder {
    name: String!
    description: String
  }
`
