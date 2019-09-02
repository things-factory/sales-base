import { gql } from 'apollo-server-koa'

export const Vas = gql`
  type Vas {
    id: String
    name: String
    domain: Domain
    bizplace: Bizplace
    description: String
    currency: String
    creator: User
    updater: User
    createdAt: String
    updatedAt: String
  }
`
