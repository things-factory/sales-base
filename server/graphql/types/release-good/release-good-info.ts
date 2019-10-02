import { gql } from 'apollo-server-koa'

export const ReleaseGoodInfo = gql`
  type ReleaseGoodInfo {
    containerNo: String
    containerLeavingDate: String
    containerArrivalDate: String
    shipName: String
    deliveryDate: String
    to: String
    loadType: String
    telNo: String
    transportDriver: String
    transportVehicle: String
  }
`
