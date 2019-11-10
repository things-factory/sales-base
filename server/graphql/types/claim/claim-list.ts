import gql from 'graphql-tag'

export const ClaimList = gql`
  type ClaimList {
    items: [Claim]
    total: Int
  }
`
