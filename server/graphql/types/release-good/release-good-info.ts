import { gql } from 'apollo-server-koa'

export const ReleaseGoodInfo = gql`
  type ReleaseGoodInfo {
    containerNo: String
    containerLeavingDate: String
    containerArrivalDate: String
    containerLeavingDateTime: String
    containerArrivalDateTime: String
    shipName: String
  }
`
