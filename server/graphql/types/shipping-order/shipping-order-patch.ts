import { gql } from 'apollo-server-koa'

export const ShippingOrderPatch = gql`
  input ShippingOrderPatch {
    name: String
    description: String
    shipName: String
    containerNo: String
    containerArrivalDate: String
    containerLeavingDate: String
    containerArrivalDateTime: Date
    containerLeavingDateTime: Date
    remark: String
    status: String
  }
`
