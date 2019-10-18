import { gql } from 'apollo-server-koa'
export const NewClaim = gql`
  input NewClaim {
    name: String
    description: String
    billingMode: String
    charges: Float
    transportDriverName: String
    transportVehicleName: String
    from: String
    to: String
    remark: String
    claimDetails: [NewClaimDetail]
    claimOrders: [NewClaimOrder]
  }
`
