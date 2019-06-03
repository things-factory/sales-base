import { gql } from 'apollo-server-koa'

export const QuotationList = gql`
  input QuotationList {
    items: [Quotation]
    total: Int
  }
`
