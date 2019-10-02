import { gql } from 'apollo-server-koa'

export const ShippingOrder = gql`
  type ShippingOrder {
    id: String
    domain: Domain
    bizplace: Bizplace
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
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
