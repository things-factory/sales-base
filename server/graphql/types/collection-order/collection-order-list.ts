import { gql } from 'apollo-server-koa'

export const CollectionOrderList = gql`
  type CollectionOrderList {
    items: [CollectionOrder]
    total: Int
  }
`
