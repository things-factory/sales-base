import gql from 'graphql-tag'

export const OrderProductList = gql`
  type OrderProductList {
    items: [OrderProduct]
    total: Int
  }
`
