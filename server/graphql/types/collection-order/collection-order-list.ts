import gql from 'graphql-tag'

export const CollectionOrderList = gql`
  type CollectionOrderList {
    items: [CollectionOrder]
    total: Int
  }
`
