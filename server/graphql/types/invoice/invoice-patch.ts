import gql from 'graphql-tag'

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
