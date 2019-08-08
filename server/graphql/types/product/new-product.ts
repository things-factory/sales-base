import { gql } from 'apollo-server-koa'

export const NewProduct = gql`
  input NewProduct {
    name: String!
    description: String
  }
`
