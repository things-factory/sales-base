import gql from 'graphql-tag'

export const VasOrderList = gql`
  type VasOrderList {
    items: [VasOrder]
    total: Int
  }
`
