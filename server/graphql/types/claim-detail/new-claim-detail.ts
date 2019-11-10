import gql from 'graphql-tag'

export const NewClaimDetail = gql`
  input NewClaimDetail {
    name: String!
    description: String
    refNo: String
    amount: Float
  }
`
