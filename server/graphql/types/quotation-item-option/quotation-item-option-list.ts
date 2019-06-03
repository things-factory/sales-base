import { gql } from 'apollo-server-koa'

export const QuotationItemOptionList = gql`
  input QuotationItemOptionList {
    items: [QuotationItemOption]
    total: Int
  }
`
