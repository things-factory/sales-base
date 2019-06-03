import { gql } from 'apollo-server-koa'

export const QuotationItemList = gql`
  input QuotationItemList {
    items: [QuotationItem]
    total: Int
  }
`
