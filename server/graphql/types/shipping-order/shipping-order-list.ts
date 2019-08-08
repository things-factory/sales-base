import { gql } from 'apollo-server-koa'

export const ShippingOrderList = gql`
  type ShippingOrderList {
    items: [ShippingOrder]
    total: Int
  }
`
