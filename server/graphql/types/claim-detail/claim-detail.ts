import { gql } from 'apollo-server-koa'

export const ClaimDetail = gql`
  type ClaimDetail {
    id: String
    name: String
    domain: Domain
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
