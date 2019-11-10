import gql from 'graphql-tag'

export const TransportOrderDetailList = gql`
  type TransportOrderDetailList {
    items: [TransportOrderDetail]
    total: Int
  }
`
