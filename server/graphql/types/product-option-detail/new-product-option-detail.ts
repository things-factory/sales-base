import { gql } from 'apollo-server-koa'

export const NewProductOptionDetail = gql`
  input NewProductOptionDetail {
    name: String!
    description: String
  }
`
