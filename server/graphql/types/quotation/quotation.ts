import gql from 'graphql-tag'

export const Quotation = gql`
  type Quotation {
    id: String
    domain: Domain
    name: String
    customer: Bizplace
    issuedOn: String
    expiresOn: String
    version: String
    items: [QuotationItem]
    currency: String
    vat: Float
    totalPrice: Float
    state: String
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
