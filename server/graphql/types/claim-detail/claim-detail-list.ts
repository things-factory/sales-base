import gql from 'graphql-tag'

export const ClaimDetailList = gql`
  type ClaimDetailList {
    items: [ClaimDetail]
    total: Int
  }
`
