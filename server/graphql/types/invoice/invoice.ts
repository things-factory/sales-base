import { gql } from 'apollo-server-koa'

export const Invoice = gql`
  type Invoice {
    id: String
    domain: Domain
    name: String
    customer: Customer
    issuedOn: String
    paymentDue: String
    version: String
    purchaseOrder: PurchaseOrder
    state: String
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
