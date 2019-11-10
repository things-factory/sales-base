import gql from 'graphql-tag'

export const PurchaseOrderPatch = gql`
  input PurchaseOrderPatch {
    name: String
    issuedOn: String
    quotation: String
    customer: String
    state: String
    description: String
  }
`
