import { gql } from 'apollo-server-koa'

export const QuotationItemOption = gql`
  type QuotationItemOption {
    id: String
    domain: Domain
    name: String
    value: String
    quotationItem: QuotationItem
    description: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
