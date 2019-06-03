import { gql } from 'apollo-server-koa'

export const QuotationItemOptionList = gql`
  type QuotationItemOptionList {
    items: [QuotationItemOption]
    total: Int
  }
`
