import { gql } from 'apollo-server-koa'

export const NewQuotationItemOption = gql`
  input NewQuotationItemOption {
    name: String!
    description: String
  }
`
