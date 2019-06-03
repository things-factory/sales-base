import { gql } from 'apollo-server-koa'

export const QuotationList = gql`
  type QuotationList {
    items: [Quotation]
    total: Int
  }
`
