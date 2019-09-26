import { gql } from 'apollo-server-koa'

export const ClaimList = gql`
  type ClaimList {
    items: [Claim]
    total: Int
  }
`
