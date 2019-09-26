import { gql } from 'apollo-server-koa'

export const NewClaimDetail = gql`
  input NewClaimDetail {
    name: String!
    description: String
    refNo: String
    amount: Float
  }
`
