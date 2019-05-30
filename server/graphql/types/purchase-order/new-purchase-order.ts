import { gql } from 'apollo-server-koa'

export const NewPurchaseOrder = gql`
  input NewPurchaseOrder {
    name: String!
    description: String
  }
`
