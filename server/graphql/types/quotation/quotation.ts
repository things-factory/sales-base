import { gql } from 'apollo-server-koa'

export const Quotation = gql`
  type Quotation {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
