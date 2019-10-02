import { gql } from 'apollo-server-koa'

export const ReleaseGoodInfo = gql`
  type ReleaseGoodInfo {
    containerNo: String
    containerLeavingDate: String
    containerArrivalDate: String
    containerLeavingDateTime: String
    containerArrivalDateTime: String
    shipName: String
    deliveryDate: String
    deliveryDateTime: Date
    to: String
    loadType: String
    telNo: String
    transportDriver: String
    transportVehicle: String
  }
`
