import gql from 'graphql-tag'

export const ReturnOrderList = gql`
  type ReturnOrderList {
    items: [ReturnOrder]
    total: Int
  }
`
