import { gql } from 'apollo-server-koa'

export const NewInvoice = gql`
  input NewInvoice {
    name: String!
    customer: String!
    issuedOn: String!
    paymentDue: String!
    version: String!
    purchaseOrder: String!
    state: String!
    description: String
  }
`
