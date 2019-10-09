import { gql } from 'apollo-server-koa'
export const NewClaim = gql`
  input NewClaim {
    name: String!
    description: String
    billingMode: String!
    claimDetails: [NewClaimDetail]
  }
`
