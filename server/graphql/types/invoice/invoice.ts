import gql from 'graphql-tag'

export const Invoice = gql`
  type Invoice {
    id: String
    domain: Domain
    name: String
    customer: Bizplace
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
