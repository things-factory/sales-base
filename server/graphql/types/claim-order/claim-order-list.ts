import { gql } from 'apollo-server-koa'

export const ClaimOrderList = gql`
  type ClaimOrderList {
    items: [ClaimOrder]
    total: Int
  }
`
