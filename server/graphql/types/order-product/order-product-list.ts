import { gql } from 'apollo-server-koa'

export const OrderProductList = gql`
  type OrderProductList {
    items: [OrderProduct]
    total: Int
  }
`
