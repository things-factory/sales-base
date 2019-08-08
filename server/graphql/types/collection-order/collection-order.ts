import { gql } from 'apollo-server-koa'

export const CollectionOrder = gql`
  type CollectionOrder {
    id: String
    name: String
    domain: Domain
    description: String
  }
`
