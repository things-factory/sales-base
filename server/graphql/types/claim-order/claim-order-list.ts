import gql from 'graphql-tag'

export const ClaimOrderList = gql`
  type ClaimOrderList {
    items: [ClaimOrder]
    total: Int
  }
`
