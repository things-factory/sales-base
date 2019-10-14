import { gql } from 'apollo-server-koa'

export const TransportOrderDetailList = gql`
  type TransportOrderDetailList {
    items: [TransportOrderDetail]
    total: Int
  }
`
