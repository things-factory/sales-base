import { gql } from 'apollo-server-koa'

export const PurchaseOrderPatch = gql`
  input PurchaseOrderPatch {
    name: String
    description: String
  }
`
