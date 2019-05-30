import { gql } from 'apollo-server-koa'

export const NewQuotation = gql`
  input NewQuotation {
    name: String!
    description: String
  }
`
