import gql from 'graphql-tag'

export const NewQuotation = gql`
  input NewQuotation {
    name: String!
    customer: String!
    issuedOn: String!
    expiresOn: String!
    version: String!
    items: [String]!
    currency: String!
    vat: Float!
    totalPrice: Float!
    state: String!
    description: String
  }
`
