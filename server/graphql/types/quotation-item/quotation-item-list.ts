import { gql } from 'apollo-server-koa'

export const QuotationItemList = gql`
  type QuotationItemList {
    items: [QuotationItem]
    total: Int
  }
`
