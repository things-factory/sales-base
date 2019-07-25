import { gql } from 'apollo-server-koa'

export const NewPurchaseOrder = gql`
  input NewPurchaseOrder {
    name: String!
    issuedOn: String!
    quotation: String!
    customer: String!
    state: String!
    description: String
  }
`
