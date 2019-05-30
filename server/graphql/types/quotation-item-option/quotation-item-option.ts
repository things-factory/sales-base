import { gql } from 'apollo-server-koa'

export const QuotationItemOption = gql`
  type QuotationItemOption {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
