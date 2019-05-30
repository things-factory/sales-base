import { gql } from 'apollo-server-koa'

export const NewQuotationItem = gql`
  input NewQuotationItem {
    name: String!
    description: String
  }
`
