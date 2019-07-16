import { gql } from 'apollo-server-koa'

export const Quotation = gql`
  type Quotation {
    id: String
    domain: Domain
    name: String
    customer: Customer
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
