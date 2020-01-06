import gql from 'graphql-tag'

export const NewPurchaseOrder = gql`
  input NewPurchaseOrder {
    name: String!
    issuedOn: String!
    quotation: String
    customer: String
    state: String!
    description: String
  }
`
