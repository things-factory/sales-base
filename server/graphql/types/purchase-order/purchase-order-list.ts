import { gql } from 'apollo-server-koa'

export const PurchaseOrderList = gql`
  input PurchaseOrderList {
    items: [PurchaseOrder]
    total: Int
  }
`
