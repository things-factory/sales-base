import { gql } from 'apollo-server-koa'

export const QuotationItem = gql`
  type QuotationItem {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
