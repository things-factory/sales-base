import gql from 'graphql-tag'

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
