import { gql } from 'apollo-server-koa'

export const NewQuotationItemOption = gql`
  input NewQuotationItemOption {
    name: String!
    value: String
    quotationItem: QuotationItem
    description: String
  }
`
