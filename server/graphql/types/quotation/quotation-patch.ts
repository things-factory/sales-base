import { gql } from 'apollo-server-koa'

export const QuotationPatch = gql`
  input QuotationPatch {
    name: String
    description: String
  }
`
