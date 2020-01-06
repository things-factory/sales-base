import gql from 'graphql-tag'

export const PurchaseOrder = gql`
  type PurchaseOrder {
    id: String
    domain: Domain
    name: String
    issuedOn: String
    quotation: Quotation
    customer: Bizplace
    state: String
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
