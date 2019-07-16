import { gql } from 'apollo-server-koa'

export const InvoicePatch = gql`
  input InvoicePatch {
    name: String
    customer: String
    issuedOn: String
    paymentDue: String
    version: String
    purchaseOrder: String
    state: String
    description: String
  }
`
