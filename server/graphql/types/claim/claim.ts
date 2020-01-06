import gql from 'graphql-tag'

export const Claim = gql`
  type Claim {
    id: String
    name: String
    domain: Domain
    description: String
    orderName: String
    billingMode: String
    transportDriverName: String
    transportVehicleName: String
    from: String
    to: String
    remark: String
    charges: Float
    bizplace: Bizplace
    transportDriver: TransportDriver
    transportVehicle: TransportVehicle
    drum: Float
    pallet: Float
    carton: Float
    bag: Float
    other: Float
    status: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
    claimDetails: [ClaimDetail]
    claimOrders: [ClaimOrder]
  }
`
