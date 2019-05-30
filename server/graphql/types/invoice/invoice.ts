import { gql } from 'apollo-server-koa'

export const Invoice = gql`
  type Invoice {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
