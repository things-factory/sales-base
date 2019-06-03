import { gql } from 'apollo-server-koa'

export const InvoiceList = gql`
  input InvoiceList {
    items: [Invoice]
    total: Int
  }
`
