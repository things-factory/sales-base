import { gql } from 'apollo-server-koa'
export const NewClaim = gql`
  input NewClaim {
    name: String!
    description: String
    claimDetails: [NewClaimDetail]
  }
`
