import gql from 'graphql-tag'

export const ShippingOrderList = gql`
  type ShippingOrderList {
    items: [ShippingOrder]
    total: Int
  }
`
