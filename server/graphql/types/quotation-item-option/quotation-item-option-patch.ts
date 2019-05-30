import { gql } from 'apollo-server-koa'

export const QuotationItemOptionPatch = gql`
  input QuotationItemOptionPatch {
    name: String
    description: String
  }
`
