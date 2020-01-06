import gql from 'graphql-tag'

export const PurchaseOrderList = gql`
  type PurchaseOrderList {
    items: [PurchaseOrder]
    total: Int
  }
`
