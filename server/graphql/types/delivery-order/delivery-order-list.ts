import gql from 'graphql-tag'

export const DeliveryOrderList = gql`
  type DeliveryOrderList {
    items: [DeliveryOrder]
    total: Int
  }
`
