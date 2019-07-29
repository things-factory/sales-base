import { gql } from 'apollo-server-koa'

export const DeliveryOrderList = gql`
  type DeliveryOrderList {
    items: [DeliveryOrder]
    total: Int
  }
`
