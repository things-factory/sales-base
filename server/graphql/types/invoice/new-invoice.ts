import { gql } from 'apollo-server-koa'

export const NewInvoice = gql`
  input NewInvoice {
    name: String!
    description: String
  }
`
