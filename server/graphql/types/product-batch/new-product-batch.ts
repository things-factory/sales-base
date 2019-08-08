import { gql } from 'apollo-server-koa'

export const NewProductBatch = gql`
  input NewProductBatch {
    name: String!
    description: String
  }
`
