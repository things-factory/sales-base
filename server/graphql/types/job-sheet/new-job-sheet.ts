import { gql } from 'apollo-server-koa'

export const NewJobSheet = gql`
  input NewJobSheet {
    name: String!
    description: String
    bundle: String!
  }
`
