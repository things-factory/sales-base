import { gql } from 'apollo-server-koa'

export const NewClaimOrder = gql`
  input NewClaimOrder {
    name: String!
    description: String
  }
`
