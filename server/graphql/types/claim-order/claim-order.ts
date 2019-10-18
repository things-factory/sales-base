import { gql } from 'apollo-server-koa'

export const ClaimOrder = gql`
  type ClaimOrder {
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
