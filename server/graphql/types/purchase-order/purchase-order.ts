import { gql } from 'apollo-server-koa'

export const PurchaseOrder = gql`
  type PurchaseOrder {
    id: String
    domain: Domain
    name: String
    issuedOn: String
    quotation: Quotation
    customer: Customer
    state: String
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
