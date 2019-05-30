import { gql } from 'apollo-server-koa'

export const PurchaseOrder = gql`
  type PurchaseOrder {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
