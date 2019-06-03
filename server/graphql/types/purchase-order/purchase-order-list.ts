import { gql } from 'apollo-server-koa'

export const PurchaseOrderList = gql`
  type PurchaseOrderList {
    items: [PurchaseOrder]
    total: Int
  }
`
