import gql from 'graphql-tag'

export const ShippingOrderPatch = gql`
  input ShippingOrderPatch {
    name: String
    description: String
    shipName: String
    containerNo: String
    containerArrivalDate: String
    containerLeavingDate: String
    containerArrivalDateTime: String
    containerLeavingDateTime: String
    remark: String
    status: String
  }
`
