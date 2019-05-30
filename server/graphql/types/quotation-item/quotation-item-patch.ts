import { gql } from 'apollo-server-koa'

export const QuotationItemPatch = gql`
  input QuotationItemPatch {
    name: String
    description: String
  }
`
