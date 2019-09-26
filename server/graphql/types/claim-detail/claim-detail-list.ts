import { gql } from 'apollo-server-koa'

export const ClaimDetailList = gql`
  type ClaimDetailList {
    items: [ClaimDetail]
    total: Int
  }
`
