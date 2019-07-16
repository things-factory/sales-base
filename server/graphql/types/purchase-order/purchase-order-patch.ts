import { gql } from 'apollo-server-koa'

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
