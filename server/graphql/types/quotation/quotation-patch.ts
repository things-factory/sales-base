import { gql } from 'apollo-server-koa'

export const QuotationPatch = gql`
  input QuotationPatch {
    name: String
    customer: String
    issuedOn: String
    expiresOn: String
    version: String
    items: [String]
    currency: String
    vat: Float
    totalPrice: Float
    state: String
    description: String
  }
`
