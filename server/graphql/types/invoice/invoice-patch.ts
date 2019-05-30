import { gql } from 'apollo-server-koa'

export const InvoicePatch = gql`
  input InvoicePatch {
    name: String
    description: String
  }
`
