import { gql } from 'apollo-server-koa'

export const InvoiceList = gql`
  type InvoiceList {
    items: [Invoice]
    total: Int
  }
`
