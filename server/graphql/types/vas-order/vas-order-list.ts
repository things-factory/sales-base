import { gql } from 'apollo-server-koa'

export const VasOrderList = gql`
  type VasOrderList {
    items: [VasOrder]
    total: Int
  }
`
