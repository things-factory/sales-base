import { gql } from 'apollo-server-koa'

export const QuotationItemOptionPatch = gql`
  input QuotationItemOptionPatch {
    name: String
    value: String
    quotationItem: String
    description: String
  }
`
