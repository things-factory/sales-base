import { gql } from 'apollo-server-koa'

export const ReleaseGoodInfo = gql`
  type ReleaseGoodInfo {
    containerNo: String
    containerLeavingDate: String
    containerArrivalDate: String
    shipName: String
    deliveryDateTime: String
    telNo: String
  }
`
