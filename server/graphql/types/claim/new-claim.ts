import { gql } from 'apollo-server-koa'
export const NewClaim = gql`
  input NewClaim {
    name: String
    description: String
    billingMode: String
    charges: Float
    transportDriver: String
    transportVehicle: String
    from: String
    to: String
    remark: String
    bizplace: String
    drum: Float
    pallet: Float
    carton: Float
    bag: Float
    other: Float
    claimDetails: [NewClaimDetail]
    claimOrders: [NewClaimOrder]
  }
`
