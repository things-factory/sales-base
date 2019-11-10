import gql from 'graphql-tag'

export const NewClaimOrder = gql`
  input NewClaimOrder {
    name: String!
    description: String
  }
`
