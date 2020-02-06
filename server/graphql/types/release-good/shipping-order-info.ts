import gql from 'graphql-tag'

export const ShippingOrderInfo = gql`
  type ShippingOrderInfo {
    containerNo: String
    containerLeavingDate: String
    containerArrivalDate: String
    containerLeavingDateTime: String
    containerArrivalDateTime: String
    shipName: String
  }
`
